
export interface IMailOptions {
    from?: string ;
    to: string;
    subject: string;
    text?: string;  // Optional if HTML is provided
    html?: string;  // Optional if text is provided
  }

  // Default values for `IMailOptions`
export const defaultMailOptions: Partial<IMailOptions> = {
  from: "support@swiftcab.in",
};


// Function to create mail options with defaults
export const createMailOptions = (options: IMailOptions): IMailOptions => {
  return { ...defaultMailOptions, ...options };
};