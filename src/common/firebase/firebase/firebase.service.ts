import { Injectable } from '@nestjs/common';
// import { FirebaseStorage } from 'firebase-admin';
import * as admin from 'firebase-admin';
// import { initializeApp , cert , ServiceAccount ,  } from 'firebase-admin/app';
// import { Storage , getStorage } from 'firebase-admin/storage';

@Injectable()
export class FirebaseService {
  fireBaseConfig = {
    "type": "service_account",
    "project_id": "makeupeasy-4a15d",
    "private_key_id": "37530369f6cf8b5519f591900bff28854d5f95a8",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCnqMSjHA2IwFE9\ngFkovrJRuOyMxDEmGGfQibDf7WE01fu3VCgRIPRKPbgb7ibd2v+s/rm2/fSTA8y4\n2qOp8Dw52g4eCoSbHG5T1hdeHXgrF5vMhr+Hb+dxCTrDH3jg/JcppUQhLNvdvLQg\nMyGL3pgFAZryvQuWrwG3uBjitdZAdnXNSyOlwPKdGr6f8NbAqJXMR1pr3ANvsn2m\noKp+oKFcBtVaxVx1ekc/tWGkkoruaLI4QO50fUCxoRW1FSEnSrmHFuBBg0h5dzZD\nF0juKvcluKgIH7dvf8N/u8lpqDhxJa5C/bEt/jESBxvQIzk3R/J46Yw1zDPfsgR2\nNdSOhXI7AgMBAAECggEABDGv1SYRSCl75eVn8gVSU4myZaG/r6u5SnJQOdnSdXkg\n5Ixhnm691NKA4G9TCrESWWhNbiQhw87XTaj2FEQb4uqZ3AejGyMgYaRKanf4s0NE\nCiZRrVwBndSb1O5q88+odxEDpPWzisiXWyu+Dd51h075+MTEVjmnMsqTZ3XM0NdN\nLYytH8wXSMe1kMTR/xU3aDh0I1UNMmySb7SnRIKeF/esvqbCjKM+ZVTt8iC43bHp\niLhyXDYUSdoFzbfQmT9Uh6B6gH5QK5iZ7za9LL+lrXdbOtdrnQwhDsf5ZnZ4h+El\nwZxWDSBiW77huVaZ5ALyBGSrL9x8tyhy2eh3nwvjMQKBgQDdFrwfgugBwE2uZbNe\n/tzedqyxfeVI6gd1iHvokweLXLsp+FFhqOY5ef8LkmuyeGPkGF4ahHP8OvGt7Lmm\nzxGjNktdRiBSXWp9S0+hVexgZkFr1ldzS01AOMWktFX5PIy98+UbBLTG6rwvB9ly\nxGHFkkmLmJpFYxNQ62u8BrleYwKBgQDCIjQrkXjymay4kd31LaUoP+vEdnqlKMtt\nvuUoCNVaOvsxXN/QSA5msC6dj7+hjWgUwwyGWX2XRNMYozN4puY0wRm9ghG2J3Mb\n7T9ToY332xTs1tGL+/xCl8XmNu3O9x/XFcY+dDSoXisIF3mgJfos70wKqelV7mA9\nXgdUB8LYSQKBgQDZprYQt4i7oJtY4toQ3QqHH4GnQm9ktrAdLv382jIFKoc/LCzB\n3cq4Lre8pqrLieWc+bg6lsawOz8NoAysgRG2AY90BcNwEnLxYiDEjZgk1sX06ZAx\n+qHUZY99M+Ond8p+fgq/7IQjh5c3HZ0edOJj5D3u5Y6KXJz5fqoS8vOuTQKBgQCX\nKrslEen0PuXX8v265QguB1g3a2qlINcHZhZazkYUNMlU7tT5AqL0I0ypND4sNkhN\nonQmSZkaKWWXUb3KvWuUuKiqgJX6GU3w+RTOsoYx8k6g/cW+E0GjOTvIwAz9lEEe\n4r2z9Bjs4ibv7hevNONSCiRUSWqAl1YpcwaR0FlQwQKBgQCmBJNnRKZdjIOQ5BjD\n7WvMXJU8TPuA4+lbv7+lPnfApSWlYqdl/mxy3rUnGrNq/Vs1mLtFUnywSDPELH6N\nGiA497Czq1SLn2iivfSETjr0ytVqIrZ3KVsabUZi441KmB1j6sQQkFQ7rEaDe7EE\n+XSj2diEhVzVZADHdJNWwNTAjA==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-uwdpp@makeupeasy-4a15d.iam.gserviceaccount.com",
    "client_id": "116726688128541846738",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-uwdpp%40makeupeasy-4a15d.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }


  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(this.fireBaseConfig as admin.ServiceAccount),
      storageBucket: "gs://makeupeasy-4a15d.appspot.com",
    });

  }

  async uploadImage(file: any): Promise<string> {
    const storageBucket = admin.storage().bucket();
    const uniqueFilename = `${Date.now()}_${file.originalname}`;

    const fileStream = storageBucket.file(uniqueFilename).createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      fileStream.on('pipe', (response)=>{
        console.log("pipe",response)
      })
      fileStream.on('error', (error) => {
        reject(error);
      });

      fileStream.on('finish', (response) => {
        console.log("finish", response)
        resolve(uniqueFilename);
      });

      fileStream.end(file.buffer);
    });
  }


  async getImageUrl(filename: string): Promise<string> {
    const file = admin.storage().bucket().file(filename);
    
    const imageUrl:any = await file.getSignedUrl({
      action: 'read',
      expires: '03-17-2025', 
    });

    return imageUrl;
  }

  async deleteImageByFileName(filename: string): Promise<void> {
    const storageBucket = admin.storage().bucket();

    try {
      await storageBucket.file(filename).delete();
    } catch (error) {
      throw new Error(`Error deleting image: ${error.message}`);
    }
  }


}
