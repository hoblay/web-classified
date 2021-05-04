const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createCountry(req, res) {
  const { name, currencyId } = req.body;
  try {
    const newCountry = await prisma.country.create({
      data: {
        name,
        currencyId,
      },
    });
    if (newCountry) {
      return res.json({
        msg: `The Country '${name}' was succesfully created.`,
        data: newCountry,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function getCountry(req, res) {
  let { id } = req.params;

  try {
    const country = await prisma.country.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        currency: {
          select: {
            id: true,
            name: true,
          },
        },
        states: {
          select: {
            id: true,
            name: true,
            cities: {
              select: {
                id: true,
                name: true,
                counties: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (country) {
      return res.json({
        msg: `The Country was succesfully fetched.`,
        data: country,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function getCountries(req, res) {
  try {
    const allCountries = await prisma.country.findMany({
      select: {
        id: true,
        name: true,
        currency: {
          select: {
            id: true,
            name: true,
          },
        },
        states: {
          select: {
            id: true,
            name: true,
            cities: {
              select: {
                id: true,
                name: true,
                counties: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (allCountries) {
      return res.json({
        msg: `The Countries were succesfully fetched.`,
        data: allCountries,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function updateCountry(req, res) {
  let { id } = req.params;
  const { name, currencyId } = req.body;

  try {
    const updatedCountry = await prisma.country.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        currencyId,
      },
    });

    if (updatedCountry) {
      return res.json({
        msg: `The Country '${updatedCountry.name}' was succesfully updated.`,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function deleteCountry(req, res) {
  let { id } = req.params;
  try {
    const deletedCountry = await prisma.country.delete({
      where: {
        id: Number(id),
      },
    });
    if (deletedCountry) {
      return res.json({
        msg: `The Country was succesfully deleted.`,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function createState(req, res) {
  const { name, countryId } = req.body;
  try {
    const newState = await prisma.state.create({
      data: {
        name,
        countryId,
      },
    });
    if (newState) {
      return res.json({
        msg: `The State '${name}' was succesfully created.`,
        data: newState,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function getState(req, res) {
  let { id } = req.params;

  try {
    const state = await prisma.state.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        country: {
          select: {
            id: true,
            name: true,
            currency: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        cities: {
          select: {
            id: true,
            name: true,
            counties: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (state) {
      return res.json({
        msg: `The state was succesfully fetched.`,
        data: state,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function getStates(req, res) {
  try {
    const allStates = await prisma.state.findMany({
      select: {
        id: true,
        name: true,
        country: {
          select: {
            id: true,
            name: true,
            currency: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        cities: {
          select: {
            id: true,
            name: true,
            counties: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    if (allStates) {
      return res.json({
        msg: `The States were succesfully fetched.`,
        data: allStates,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function updateState(req, res) {
  let { id } = req.params;
  const { name, currencyId } = req.body;

  try {
    const updatedState = await prisma.state.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        countryId,
      },
    });

    if (updatedState) {
      return res.json({
        msg: `The State '${updatedState.name}' was succesfully updated.`,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function deleteState(req, res) {
  let { id } = req.params;
  try {
    const deletedState = await prisma.state.delete({
      where: {
        id: Number(id),
      },
    });
    if (deletedState) {
      return res.json({
        msg: `The State was succesfully deleted.`,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function createCity(req, res) {
  const { name, stateId } = req.body;
  try {
    const newCity = await prisma.city.create({
      data: {
        name,
        stateId,
      },
    });
    if (newCity) {
      return res.json({
        msg: `The City '${name}' was succesfully created.`,
        data: newCity,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function getCity(req, res) {
  let { id } = req.params;

  try {
    const city = await prisma.city.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        state: {
          select: {
            id: true,
            name: true,
            country: {
              select: {
                id: true,
                name: true,
                currency: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
        counties: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (city) {
      return res.json({
        msg: `The city was succesfully fetched.`,
        data: city,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function getCities(req, res) {
  try {
    const allCities = await prisma.city.findMany({
      select: {
        id: true,
        name: true,
        state: {
          select: {
            id: true,
            name: true,
            country: {
              select: {
                id: true,
                name: true,
                currency: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
        counties: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (allCities) {
      return res.json({
        msg: `The Cities were succesfully fetched.`,
        data: allCities,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function updateCity(req, res) {
  let { id } = req.params;
  const { name, stateId } = req.body;

  try {
    const updatedCity = await prisma.city.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        stateId,
      },
    });

    if (updatedCity) {
      return res.json({
        msg: `The City '${updatedCity.name}' was succesfully updated.`,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function deleteCity(req, res) {
  let { id } = req.params;
  try {
    const deletedCity = await prisma.city.delete({
      where: {
        id: Number(id),
      },
    });
    if (deletedCity) {
      return res.json({
        msg: `The City was succesfully deleted.`,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function createCounty(req, res) {
  const { name, cityId } = req.body;
  try {
    const newCounty = await prisma.county.create({
      data: {
        name,
        cityId,
      },
    });
    if (newCounty) {
      return res.json({
        msg: `The County '${name}' was succesfully created.`,
        data: newCounty,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function getCounty(req, res) {
  let { id } = req.params;

  try {
    const county = await prisma.county.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        cities: {
          select: {
            id: true,
            name: true,
            state: {
              select: {
                id: true,
                name: true,
                country: {
                  select: {
                    id: true,
                    name: true,
                    currency: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (county) {
      return res.json({
        msg: `The County was succesfully fetched.`,
        data: county,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function getCounties(req, res) {
  try {
    const allCounties = await prisma.county.findMany({
      select: {
        id: true,
        name: true,
        cities: {
          select: {
            id: true,
            name: true,
            state: {
              select: {
                id: true,
                name: true,
                country: {
                  select: {
                    id: true,
                    name: true,
                    currency: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    if (allCounties) {
      return res.json({
        msg: `The Counties were succesfully fetched.`,
        data: allCounties,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function updateCounty(req, res) {
  let { id } = req.params;
  const { name, cityId } = req.body;

  try {
    const updatedCounty = await prisma.county.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        cityId,
      },
    });

    if (updatedCounty) {
      return res.json({
        msg: `The County '${updatedCounty.name}' was succesfully updated.`,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function deleteCounty(req, res) {
  let { id } = req.params;
  try {
    const deletedCounty = await prisma.county.delete({
      where: {
        id: Number(id),
      },
    });
    if (deletedCounty) {
      return res.json({
        msg: `The County was succesfully deleted.`,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

module.exports = {
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
};
