const { Router } = require('express');
const router = Router();

const {
  createCountry,
  getCountry,
  getCountries,
  updateCountry,
  deleteCountry,
  createState,
  getState,
  getStates,
  updateState,
  deleteState,
  createCity,
  getCity,
  getCities,
  updateCity,
  deleteCity,
  createCounty,
  getCounty,
  getCounties,
  updateCounty,
  deleteCounty,
} = require('../controllers/address.controller');

// * api/address/country/
router.post('/country', createCountry);

// * api/address/countries/
router.get('/countries', getCountries);

// * api/address/country/:id
router.get('/country/:id', getCountry);
router.delete('/country/:id', deleteCountry);
router.put('/country/:id', updateCountry);

// * api/address/state/
router.post('/state', createState);

// * api/address/states/
router.get('/states', getStates);

// * api/address/state/:id
router.get('/state/:id', getState);
router.delete('/state/:id', deleteState);
router.put('/state/:id', updateState);

// * api/address/city/
router.post('/city', createCity);

// * api/address/cities/
router.get('/cities', getCities);

// * api/address/city/:id
router.get('/city/:id', getCity);
router.delete('/city/:id', deleteCity);
router.put('/city/:id', updateCity);

// * api/address/county/
router.post('/county', createCounty);

// * api/address/counties/
router.get('/counties', getCounties);

// * api/address/county/:id
router.get('/county/:id', getCounty);
router.delete('/county/:id', deleteCounty);
router.put('/county/:id', updateCounty);

module.exports = router;
