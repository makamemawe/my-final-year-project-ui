import { FileHandle } from "./file-handle.model";

export interface Member{
  fullName: string,
  email: string,
  phone: string,
  fieldLevel: string,
  registrationNumber: string,
  profileImage: FileHandle;
}
