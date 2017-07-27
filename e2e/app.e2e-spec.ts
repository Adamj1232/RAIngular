import { AngularWeatherAppPage } from './app.po';

describe('angular-weather-app App', () => {
  let page: AngularWeatherAppPage;

  beforeEach(() => {
    page = new AngularWeatherAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
