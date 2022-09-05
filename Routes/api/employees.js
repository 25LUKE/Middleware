const express = require('express');
const router = express.Router();
const employeesCounttroller = require('../../controllers/employeesController')


router.route('/')
    .get(employeesCounttroller.getAllEmployees)
    .post(employeesCounttroller.createNewEmployee)
    .put(employeesCounttroller.updateEmployee)
    .delete(employeesCounttroller.deleteEmployee)


router.route('/:id')
    .get(employeesCounttroller.getEmployee);

    module.exports = router;