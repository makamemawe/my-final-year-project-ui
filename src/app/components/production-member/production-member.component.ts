import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Member } from '../../models/member.model';
import { MemberService } from '../../services/member.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-production-member',
  templateUrl: './production-member.component.html',
  styleUrl: './production-member.component.css'
})
export class ProductionMemberComponent {

  productionMembers: Member[] = [];
  memberForm!: FormGroup;

  constructor(
    private memberService: MemberService,
    private fb: FormBuilder,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadProductionMembers();
    this.initializeForm();
  }

  loadProductionMembers(): void {
    this.memberService.getProductionMembers().subscribe(data => {
      this.productionMembers = data;
    });
  }

  initializeForm(): void {
    this.memberForm = this.fb.group({
      fullName: [''],
      email: [''],
      phone: [''],
      fieldLevel: [''],
      registrationNumber: [''],
      profileImage: [null],
      productionSiteId: [null]
    });
  }

  onFileChange(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.memberForm.patchValue({ profileImage: file });
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('fullName', this.memberForm.get('fullName')?.value);
    formData.append('email', this.memberForm.get('email')?.value);
    formData.append('phone', this.memberForm.get('phone')?.value);
    formData.append('fieldLevel', this.memberForm.get('fieldLevel')?.value);
    formData.append('registrationNumber', this.memberForm.get('registrationNumber')?.value);
    formData.append('profileImage', this.memberForm.get('profileImage')?.value);
    formData.append('siteId', this.memberForm.get('productionSiteId')?.value);

    this.productService.createProductionMember(formData).subscribe(() => {
      this.loadProductionMembers();
      this.memberForm.reset();
    });
  }

  deleteProductionMember(id: any): void {
    this.memberService.deleteProductionMember(id).subscribe(() => {
      this.loadProductionMembers();
    });
  }

}
