import axiosInstance from '../utilities/axios-test';
import { AxiosResponse } from 'axios';

export class GlobalService {
  public async saveImage(image: any): Promise<AxiosResponse<any>> {
    return await axiosInstance.post('GlobalMedia/UploadBase64Image', {
      Base64String: image.data,
      FileName: image.fileName,
    });
  }
}
