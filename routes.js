const router = require('express').Router();
const { postdata } = require('./controller');

// GET localhost:8080/karyawan => Ambil data semua karyawan
router.get('/postdata', postdata.getDataPost);

// GET localhost:8080/karyawan/2 => Ambil data semua karyawan berdasarkan id = 2
router.get('/postdata/:id', postdata.getDataPostBySlug);

module.exports = router;