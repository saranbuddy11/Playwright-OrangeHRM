import { generateEmployee } from "./randomData.js";

/**
 * Creates an employee details.
 * 
 * @param {PIMPage} pimPage
 * @param {Object} employee
 */
export async function createEmployee(pimPage, employee = generateEmployee()) {
    await pimPage.openPIM();
    await pimPage.clickAddEmployee();
    await pimPage.fillEmployee(
        employee.firstName,
        employee.middleName,
        employee.lastName
    );

    await pimPage.saveEmployee();
    await pimPage.verifyEmployeeCreated(
        employee.firstName,
        employee.lastName
    );
    
    employee.id = await pimPage.getEmployeeId();
    console.log(`Created Employee -> ${employee.id} | ${employee.firstName} ${employee.lastName}`);
    return employee;
}