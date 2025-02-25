export interface  UploadedFile  {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
  };

  




  // cloudinary  file types : 

  // {
  //   asset_id: '363dcec2646048920daf6394a43f1cce',
  //   public_id: 'temp2',
  //   version: 1740510218,
  //   version_id: '1a77140f3a18821640fe956dfd717027',
  //   signature: '0fb0f382750fe3dc1b9a6b184c7304a8f6cf7dd7',
  //   width: 1920,
  //   height: 989,
  //   format: 'png',
  //   resource_type: 'image',
  //   created_at: '2025-02-25T19:03:38Z',
  //   tags: [],
  //   bytes: 439322,
  //   type: 'upload',
  //   bytes: 439322,
  //   bytes: 439322,
  //   bytes: 439322,     
  //   type: 'upload',
  //   etag: 'bbd14d462750ee1889a695db842c0544',
  //   placeholder: false,
  //   url: 'http://res.cloudinary.com/dezwbcklg/image/upload/v1740510218/temp2.png',
  //   secure_url: 'https://res.cloudinary.com/dezwbcklg/image/upload/v1740510218/temp2.png',
  //   asset_folder: '',
  //   display_name: 'temp2',
  //   original_filename: 'test-1740510216147-836463358',
  //   api_key: '898346836529153'
  // }