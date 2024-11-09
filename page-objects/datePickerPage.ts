import { Page } from "@playwright/test"

export class DatePickerPage{

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async selectCommonDatePickerDateFromToday(){
        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()

        let date = new Date()
        date.setDate(date.getDate() + 7)
        const expectedDate = date.getDate().toString()
        const expectedMonthShot = date.toLocaleString('En-US') 


    }
}