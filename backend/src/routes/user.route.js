const express = require('express');
const userService = require('../services/user.service');
const auth = require('../middlewares/auth');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

router.use(auth());

router
  .route('/me')
  .get(catchAsync(async (req, res) => {
    const user = await userService.getUserById(req.user.id);
    res.send(user);
  }))
  .patch(catchAsync(async (req, res) => {
    const user = await userService.updateUserById(req.user.id, req.body);
    res.send(user);
  }));

router.patch(
  '/change-password',
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
  .post(catchAsync(async (req, res) => {
    const address = await userService.addAddress(req.user.id, req.body);
    res.status(201).send(address);
  }));

router
  .route('/addresses/:addressId')
  .patch(catchAsync(async (req, res) => {
    const address = await userService.updateAddress(
      req.user.id,
      req.params.addressId,
      req.body
    );
    res.send(address);
  }))
  .delete(catchAsync(async (req, res) => {
    await userService.deleteAddress(req.user.id, req.params.addressId);
    res.status(204).send();
  }));

module.exports = router;
