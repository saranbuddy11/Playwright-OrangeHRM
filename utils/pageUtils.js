export async function waitForNewPage(page, action) {
    const [newPage] = await Promise.all([page.context().waitForEvent("page"), action()]);
    await newPage.waitForLoadState();
    return newPage;
}