import fakeData from "../fake-data.json";

const SIMULATED_DELAY = 300;

function mockResponse<T>(data: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, SIMULATED_DELAY);
  });
}

export const dataService = {
  getPricingPlans: () => mockResponse(fakeData.plans),
  getAboutValues: () => mockResponse(fakeData.aboutValues),
  getProfileSettings: () => mockResponse(fakeData.profileSettings),
  getSettingsToggles: () => mockResponse(fakeData.settingsToggles),
  getBusinessProfile: () => mockResponse(fakeData.businessProfile),
  getBankDetails: () => mockResponse(fakeData.bankDetails),
  getTermsParagraphs: () => mockResponse(fakeData.termsParagraphs),
  getProfileHubItems: () => mockResponse(fakeData.profileHubItems),
  getCards: () => mockResponse(fakeData.cards),
  getKycSteps: () => mockResponse(fakeData.kycSteps),
  getPaymentSections: () => mockResponse(fakeData.paymentSections),
  getClientOptions: () => mockResponse(fakeData.clientOptions),
  getFaqs: () => mockResponse(fakeData.faqs),
  getVirtualAccounts: () => mockResponse(fakeData.virtualAccounts),
  getWallets: () => mockResponse(fakeData.wallets),
  getTransactions: () => mockResponse(fakeData.transactions),
  getPaymentLinks: () => mockResponse(fakeData.paymentLinks),
};
