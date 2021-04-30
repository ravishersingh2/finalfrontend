import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import { getEachDayData,deleteDayData,addDayData,getFatSecretDetails,getWeekWiseData } from "../actions/weekActions";
import Moment from "react-moment";

class WeekWise extends Component {
  state = {};

  constructor(props){
    super(props)
    if(!localStorage.getItem("userId")){
      window.location.pathname = "/signin"
    }
  }

  componentWillMount() {
    this.props.dispatch(getWeekWiseData({
      userId:localStorage.getItem("userId")
  }))
  }

  openSingleDay = (id) => {
    if (!id) {
      return;
    }
    this.setState({
      single: true,
      singleId: id
    },()=>{
        this.props.dispatch(getEachDayData({
            userId:localStorage.getItem("userId"),
            label:id
        }))
        this.props.dispatch(getFatSecretDetails())
    });
  };

  backToWeek = () => {
    this.setState({
      single: false,
      singleId: null,
    },()=>{
      this.props.dispatch(getWeekWiseData({
        userId:localStorage.getItem("userId")
    }))
    });
  };

  addFood = () => {
      this.setState({
        show:true,
        quantity:null,
        food:null
      })
  }

  closeModal = () => {
    this.setState({
      show:false
    })
  }

  onChange = (e) => {
    this.setState({
        [e.name]:e.value
    })
  }

  saveFoodDetails = (e) => {      
    this.setState({
      show:false
    },()=>{
      this.props.dispatch(addDayData({
        userId:localStorage.getItem("userId"),
        label:this.state.singleId,
        foodId:this.state.food,
        quantity:this.state.quantity
    }))
    })
  }

  onDelete = (id) => {
    this.props.dispatch(deleteDayData({
      servingId:id,
      userId:localStorage.getItem("userId"),
      label:this.state.singleId
    }))
  }

  selectedCalDate = (e) => {
    this.openSingleDay(e.target.value)
  }

  render() {
    return (
      <div className="row" style={{ margin: "40px" }}>
          <Modal show={this.state.show}>
        <Modal.Header>
          <Modal.Title>Add Food Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
          <select value={this.state.food} className='form-control' onChange={(e)=>this.onChange({name:'food', value:e.target.value})}>
          <option selected disabled>Select</option>
              {this.props.fatsecretDetails && this.props.fatsecretDetails.map(x=>{
                  return (
                    <option value={x._id}>{x.food}</option>
                  )
              })}
        </select>
        <br/>
        <input type='number' className='form-control' placeholder='quantity' value={this.state.quantity} onChange={(e)=>this.onChange({name:'quantity', value:e.target.value})} />
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>this.closeModal()}>Close</Button>
          <Button variant="success" onClick={()=>this.saveFoodDetails()}>Add</Button>
        </Modal.Footer>
      </Modal>
        {!this.state.single ? (
          <>
          <div className='row'>
           <div className='col' style={{textAlign:"right"}}>
           <input type='date' name='date' onChange={(e)=>this.selectedCalDate(e)} /> 
           </div>
          </div>
            {this.props.weekWiseData &&
              this.props.weekWiseData.map((x) => {
                return (
                  <div
                    className="card"
                    style={{
                      margin: "10px",
                      width: "200px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      className="card-header cursorSection"
                      onClick={() => this.openSingleDay(x.label)}
                    >
                      <Moment date={x.label} format="DD MMMM" />
                    </div>
                    <div className="card-body">
                      {x["totals"] && x["totals"].length > 0 && (
                        <span style={{ textDecoration: "underline" }}>
                          Diet Total
                          <br />
                          <br />
                        </span>
                      )}
                      {x["totals"] && x["totals"].length > 0 ? (
                        x["totals"].map((y) => {
                          return (
                            <span>
                              {`${y["label"]} : ${y["quantity"]}${y["extValue"]}`}
                              <br />
                            </span>
                          );
                        })
                      ) : (
                        <span>No Diet Total Found</span>
                      )}
                    </div>
                  </div>
                );
              })}{" "}
          </>
        ) : (
          <>
            {(
                <div
                  style={{
                    width: "1210px",
                    margin: "0 100px",
                    textAlign: "center",
                  }}
                  className="card"
                >
                  <div className="card-header">
                    <Moment date={this.state.singleId} format="DD MMMM" />
                  </div>
                  <div className="card-body">
                    <div className="row" style={{ margin: "5px" }}>
                      <div className="col">
                        <button
                          type="button"
                          onClick={()=>this.addFood()}
                          className="btn btn-info cursorSection"
                        >
                          Add Food
                        </button>
                      </div>
                      <div className="col" style={{ float: "right" }}>
                        <button
                          type="button"
                          className="btn btn-info cursorSection"
                          onClick={() => this.backToWeek()}
                        >
                          Back To Week
                        </button>
                      </div>
                    </div>
                    <table className="table">
                      <thead className="thead-dark">
                        <tr>
                          <th scope="col">Food</th>
                          <th scope="col">Serv</th>
                          <th scope="col">CAL</th>
                          <th scope="col">CARB</th>
                          <th scope="col">PROT</th>
                          <th scope="col">FAT</th>
                          <th scope="col">SOD</th>
                          <th scope="col">FIBR</th>
                          <th scope="col">SUGR</th>
                          <th scope="col">VITA</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.eachDayData &&
              Object.keys(this.props.eachDayData).length > 0 && this.props.eachDayData.totals.map(x=>{
                          return (
                            <tr>
                          <td>{x['food']}</td>
                          <td>{x['serving']}</td>
                          <td>{x['cal']}</td>
                          <td>{x['carb']}</td>
                          <td>{x['prot']}</td>
                          <td>{x['fat']}</td>
                          <td>{x['sod']}</td>
                          <td>{x['fibr']}</td>
                          <td>{x['sugr']}</td>
                          <td>{x['vita']}</td>
                          <td>
                            <button type="button" onClick={()=>this.onDelete(x['_id'])} className="btn btn-danger cursorSection">
                              Delete
                            </button>
                          </td>
                        </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    username: state.auth.username,
    weekWiseData: state.week.weekWiseData,
    eachDayData: state.week.eachDayData,
    fatsecretDetails:state.week.fatsecretDetails
  };
};

export default connect(mapStateToProps)(WeekWise);
