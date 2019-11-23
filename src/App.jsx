import React, { Component } from "react";
import "./App.scss";
import Appointments from "./components/Appointments";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      targetAppointments: [],
      physiciansList: [],
      currName: null
    };
  }

  componentDidMount() {
    this.getAlldata();
  }

  getAlldata = () => {
    fetch(
      "https://s3-us-west-1.amazonaws.com/woobin-notable-test/dummy/physicians_list.json"
    )
      .then(response => response.json())
      .then(data => {
        this.setState({ physiciansList: data });
      })
      .catch(error => {
        this.setState({ error: error });
      });

    fetch(
      "https://s3-us-west-1.amazonaws.com/woobin-notable-test/dummy/appointments.json"
    )
      .then(response => response.json())
      .then(data => {
        this.setState({ appointments: data });
      })
      .catch(error => {
        this.setState({ error: error });
      });
  };

  filterAppointment = index => {
    const { appointments, physiciansList } = this.state;
    const name = physiciansList[index].name;
    const filterByPhysicianName = appointments.filter(
      appointment => appointment.physicianName === name
    );
    const timeSort = filterByPhysicianName.sort(
      (a, b) =>
        new Date("1970/01/01 " + a.time) - new Date("1970/01/01 " + b.time)
    );

    this.setState({
      currName: index,
      targetAppointments: timeSort
    });
  };

  adjustName = name => {
    return name
      .split(",")
      .reverse()
      .join(" ");
  };

  render() {
    const { targetAppointments, physiciansList, currName } = this.state;
    return (
      <div className="App">
        <section className="container">
          <div className="cal-wrapper">
            <div className="inner flex">
              <div className="left left-list">
                <div className="inner inner-con grey-bg">
                  <h4 className="logo">notable</h4>
                  <div className="content">
                    <p>PHISICIANS</p>
                    <ul>
                      {!physiciansList.length ? (
                        <div>LOADING DATA...</div>
                      ) : (
                        physiciansList.map((physician, index) => (
                          <li
                            key={index}
                            className={currName === index ? "blue-bg" : "name"}
                            onClick={() => this.filterAppointment(index)}
                          >
                            {physician.name}
                          </li>
                        ))
                      )}
                    </ul>
                    <div className="btn-wrapper">
                      <button>Logout</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right right-result">
                {targetAppointments.length ? (
                  <Appointments
                    physicianName={this.adjustName(
                      targetAppointments[0].physicianName
                    )}
                    email={targetAppointments[0].physicianEmail}
                    targetAppointments={targetAppointments}
                  />
                ) : (
                  <div className="inner">
                    Select PHISICIANS's name from the left list
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
