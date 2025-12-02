// import {
//   analyzeAccessibility,
//   getPageWithContent,
// } from '../../../../utils/e2e-tests'
// import { LdUploadItem } from '../ld-upload-item'

// describe('ld-upload-item', () => {
//   it('renders as Web Component', async () => {
//     const page = await getPageWithContent(
//       `<ld-upload-item file-name='Liquid' file-size='1.28'>
//         </ld-upload-item>`
//     )

//     const results = await page.compareScreenshot()
//     expect(results).toMatchScreenshot()
//   })

//   describe('accessibility', () => {
//     it('is accessible as a Web Component', async () => {
//       const page = await getPageWithContent(
//         `<ld-upload-item file-name='Liquid' file-size='1.28'>
//           </ld-upload-item>`
//       )
//       page.waitForChanges()

//       const accessibilityReport = await analyzeAccessibility(page)
//       expect(accessibilityReport).toHaveNoAccessibilityIssues()
//     })
//   })
// })
