import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { environment } from '../../../environments/environment';
import { SalesReport } from '../../models/sales-report.model';
import { ProductService } from '../../services/product.service';

const BASIC_URL = environment["BASIC_URL"];
Chart.register(...registerables, annotationPlugin);

@Component({
  selector: 'app-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})


export class ReportComponent implements OnInit {
  @ViewChild('salesChart') salesChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('reportTable', { static: false }) reportTable!: ElementRef;

  salesReports: SalesReport[] = [];
  totalSalesAmount: number = 0;

  constructor(
    private productService: ProductService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.saleReport();
    this.graphChart();
  }

  saleReport() {
    this.productService.getSalesReport().subscribe(data => {
      this.salesReports = data as unknown as SalesReport[];
      this.createChart(); // Ensure the chart updates with the latest data
    });
  }

  graphChart() {
    this.productService.getSalesReport().subscribe(data => {
      this.salesReports = data;
      this.createChart();
    });
  }

  private aggregateSalesData(reports: SalesReport[]): { orderFullName: string; totalAmount: number; totalOrders: number }[] {
    const aggregationMap: { [orderFullName: string]: { totalAmount: number; totalOrders: number } } = {};

    this.totalSalesAmount = 0;

    reports.forEach(report => {
      if (!aggregationMap[report.orderFullName]) {
        aggregationMap[report.orderFullName] = { totalAmount: 0, totalOrders: 0 };
      }
      aggregationMap[report.orderFullName].totalAmount += report.orderAmount;
      aggregationMap[report.orderFullName].totalOrders += 1;

      this.totalSalesAmount += report.orderAmount;
    });

    return Object.entries(aggregationMap).map(([orderFullName, value]) => ({
      orderFullName,
      totalAmount: value.totalAmount,
      totalOrders: value.totalOrders
    }));
  }

  createChart() {
    const aggregatedData = this.aggregateSalesData(this.salesReports);

    const labels = aggregatedData.map(item => item.orderFullName);
    const amounts = aggregatedData.map(item => item.totalAmount);
    const orderCounts = aggregatedData.map(item => item.totalOrders);

    const ctx = this.salesChart.nativeElement.getContext('2d');

    if (ctx) {
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Total Amount',
              data: amounts,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            },
            {
              label: 'Total Orders',
              data: orderCounts,
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
              borderColor: 'rgba(153, 102, 255, 1)',
              type: 'line',
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Amount & Orders'
              }
            }
          },
          plugins: {
            annotation: {
              annotations: {
                totalSales: {
                  type: 'label',
                  content: `Total Sales: Tzs${this.totalSalesAmount.toFixed(2)}`,
                  position: 'center', // Valid position
                  backgroundColor: 'rgba(255, 99, 132, 0.25)',
                  font: {
                    size: 16,
                    weight: 'bold'
                  },
                  xAdjust: 0,
                  yAdjust: -50
                }
              }
            }
          }
        }
      });
    } else {
      console.error('Failed to get canvas context.');
    }
  }

  generatePDF() {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const chartElement = this.salesChart.nativeElement;

    html2canvas(chartElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      const tableElement = this.reportTable.nativeElement;
      html2canvas(tableElement).then(tableCanvas => {
        const tableImgData = tableCanvas.toDataURL('image/png');
        const tableImgProps = pdf.getImageProperties(tableImgData);
        const tablePdfHeight = (tableImgProps.height * pdfWidth) / tableImgProps.width;

        pdf.addPage();
        pdf.addImage(tableImgData, 'PNG', 0, 0, pdfWidth, tablePdfHeight);
        pdf.save('sales_report.pdf');
      });
    });
  }
}





