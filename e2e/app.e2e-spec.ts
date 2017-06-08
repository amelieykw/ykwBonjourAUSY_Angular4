import { BonjourAUSYwebBOPage } from './app.po';

describe('bonjour-ausyweb-bo App', () => {
  let page: BonjourAUSYwebBOPage;

  beforeEach(() => {
    page = new BonjourAUSYwebBOPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
