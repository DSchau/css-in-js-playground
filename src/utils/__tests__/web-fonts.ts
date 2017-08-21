import loadWebFonts from '../web-fonts';

test('it does not add wf-active class name', async () => {
  await loadWebFonts();

  expect(document.documentElement.classList.contains('wf-active')).toBe(false);
});

test('it does add wf-active class name if exists in sessionStorage', async () => {
  const families = ['Montserrat:400,700', 'Bitter:400,700'];
  sessionStorage.fonts = families.join(' ');

  await loadWebFonts();

  expect(document.documentElement.classList.contains('wf-active')).toBe(true);
});

test('it returns WebFonts API', async () => {
  const WebFonts = await loadWebFonts();

  expect(WebFonts.load).toBeDefined();
});
