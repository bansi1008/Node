const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan');
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);
app.use(morgan('dev'));

const getalluser = (req, res) => {
  res.status(500).json({
    status: 'error',

    message: 'This route is not yet defined',
  });
};

const updateuser = (req, res) => {
  res.status(500).json({
    status: 'error',

    message: 'This route is not yet defined',
  });
};
const deleteuser = (req, res) => {
  res.status(500).json({
    status: 'error',

    message: 'This route is not yet defined',
  });
};
const createuser = (req, res) => {
  res.status(500).json({
    status: 'error',

    message: 'This route is not yet defined',
  });
};

const getalltours = (req, res) => {
  res.status(200).json({
    results: tours.length,
    status: 'success',
    data: {
      tours: tours,
    },
  });
};

app.get('/api/v1/tours', getalltours);

app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    });
  }
  res.status(200).json({
    results: tours.length,
    status: 'success',
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;

  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'Failed to write data to file',
        });
      }

      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    });
  }
  res.status(200).json({
    results: tours.length,
    status: 'success',
    data: {
      tours: '<updated>',
    },
  });
});

app.delete('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

app.route('/api/v1/user').get(getalluser).post(createuser);

app.route('/api/v1/user/:id').patch(updateuser).delete(deleteuser);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
