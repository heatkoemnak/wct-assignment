import { useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment';

function App() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [data, setData] = useState([]);
  const [newValue, setNewValue] = useState({
    id: '',
    title: '',
    desc: '',
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (title === '' || desc === '') {
      alert('Please fill all fields');
      return;
    }
    const newData = {
      id: data.length > 0 ? data[data.length - 1].id + 1 : 1,
      title,
      desc,
      date: moment().format('MMM Do YY'),
    };
    setData([...data, newData]);
    localStorage.setItem('data', JSON.stringify([...data, newData]));
    window.location.reload();
  };

  useEffect(() => {
    const data = localStorage.getItem('data');
    if (data) {
      setData(JSON.parse(data));
    }
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?') === false)
      return;

    const newData = data.filter((d) => d.id !== id);
    setData(newData);
    localStorage.setItem('data', JSON.stringify(newData));
  };

  const handleEdit = (id) => {
    const newData = data.find((d) => d.id === id);
    setNewValue(newData);
  };

  const submitEdit = () => {
    const newData = data.map((d) => {
      if (d.id === newValue.id) {
        return newValue;
      }
      return d;
    });
    setData(newData);
    localStorage.setItem('data', JSON.stringify(newData));
    window.location.reload();
  };
  return (
    <>
      <div className="bg-body-tertiary ">
        <div className="align-items-center d-flex flex-column justify-content-center p-5">
          <h1 className="text-center">
            <i class="fa-solid fa-bolt fs-2"></i>Todo App
          </h1>
          <div
            className="btn w-50 d-flex align-items-center m-3 justify-content-between text-end h-50"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            <span className="addNew ">Add new todo...</span>
            <i
              class="fa-solid fa-square-plus fs-2 "
              style={{ color: '#94d981' }}
            ></i>
          </div>
          <div
            className={
              data.length >= 8
                ? 'w-50 col-md-5 h-50 overflow-y-scroll'
                : 'w-50 col-md-5'
            }
          >
            <ul className="list-group  ">
              {data &&
                data.map((d) => {
                  return (
                    <li
                      key={d.id}
                      className="list-group-item d-flex justify-content-between align-items-center shadow-sm "
                    >
                      <div className="body-content">
                        <div className="title">
                          <b>{d.title}</b>
                        </div>
                        <div
                          className={
                            d.desc.length > 60 ? 'desc text-truncate' : 'desc'
                          }
                          style={{ maxWidth: '150px' }}
                        >
                          {d.desc}
                        </div>
                        <div
                          className={
                            d.desc.length > 60 ? 'desc text-truncate' : 'desc'
                          }
                          style={{ maxWidth: '150px' }}
                        >
                          <i class="fa-regular fa-clock text-warning"></i>
                          <span className="fs-19 m-2 text-warning">
                            {d.date}
                          </span>
                        </div>
                      </div>
                      <div className="actions">
                        <span
                          className="badge btn bg-primary rounded-pill m-2 text-white-150 fs-15"
                          data-bs-toggle="modal"
                          data-bs-target="#edit"
                          onClick={() => handleEdit(d.id)}
                        >
                          <i class="fa-solid fa-square-pen"></i>
                        </span>
                        <span
                          className="btn badge bg-danger rounded-pill"
                          onClick={() => handleDelete(d.id)}
                        >
                          Delete
                        </span>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <div
          className="modal fade"
          id="edit"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Edit Task
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="formGroupExampleInput" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="Enter title"
                    value={newValue.title}
                    onChange={(e) =>
                      setNewValue({
                        ...newValue,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="formGroupExampleInput2"
                    className="form-label"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput2"
                    value={newValue.desc}
                    placeholder="Enter description"
                    onChange={(e) =>
                      setNewValue({
                        ...newValue,
                        desc: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => submitEdit()}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  New Task
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="formGroupExampleInput" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="Enter title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="formGroupExampleInput2"
                    className="form-label"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput2"
                    placeholder="Enter description"
                    required
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <div class="invalid-feedback">
                    Please provide a valid city.
                  </div>
                </div>
              </div>
              <form className="modal-footer" onSubmit={onSubmitHandler}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
