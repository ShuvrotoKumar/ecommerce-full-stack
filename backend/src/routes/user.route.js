const express = require('express');
const userService = require('../services/user.service');
const auth = require('../middlewares/auth');
const catchAsync = require('../utils/catchAsync');
const validate = require('../middlewares/validate');
const { 
  updateMe, 
  changePassword, 
  addAddress, 
  updateAddress, 
  deleteAddress 
} = require('../validations/user.validation');

const router = express.Router();

router.use(auth());

router
  .route('/me')
  .get(catchAsync(async (req, res) => {
    const user = await userService.getUserById(req.user.id);
    res.send(user);
  }))
  .patch(validate(updateMe), catchAsync(async (req, res) => {
    const user = await userService.updateUserById(req.user.id, req.body);
    res.send(user);
  }));

router.patch(
  '/change-password',
  validate(changePassword),
  catchAsync(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    await userService.changePassword(req.user.id, oldPassword, newPassword);
    res.status(200).send({ message: 'Password updated successfully' });
  })
);

router
  .route('/addresses')
  .get(catchAsync(async (req, res) => {
    const addresses = await userService.getAddresses(req.user.id);
    res.send(addresses);
  }))
  .post(validate(addAddress), catchAsync(async (req, res) => {
    const address = await userService.addAddress(req.user.id, req.body);
    res.status(201).send(address);
  }));

router
  .route('/addresses/:addressId')
  .patch(validate(updateAddress), catchAsync(async (req, res) => {
    const address = await userService.updateAddress(
      req.user.id,
      req.params.addressId,
      req.body
    );
    res.send(address);
  }))
  .delete(validate(deleteAddress), catchAsync(async (req, res) => {
    await userService.deleteAddress(req.user.id, req.params.addressId);
    res.status(204).send();
  }));

module.exports = router;
