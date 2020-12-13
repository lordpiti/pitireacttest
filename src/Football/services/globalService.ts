import axiosInstance from '../utilities/axios-test';
import { AxiosResponse } from 'axios';

export interface ImagePostData {
  data: string;
  fileName: string;
}

export class GlobalService {
  public async saveImage(image: ImagePostData): Promise<AxiosResponse<any>> {
    return await axiosInstance.post('GlobalMedia/UploadBase64Image', {
      Base64String: image.data,
      FileName: image.fileName,
    });
  }
}
