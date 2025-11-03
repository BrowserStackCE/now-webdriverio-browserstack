describe("test script run from NOW", () => {
  it("open test page", async () => {
    await browser.url(process.env.NOW_WEB_DOMAIN);
    const source = await browser.getPageSource();
    const length = source.length;

    console.log("Page source length:", length);

    if (length > 100) {
      console.log("✅ Page source has more than 100 characters");
    } else {
      console.log("❌ Page source is less than or equal to 100 characters");
    }
  });
});
