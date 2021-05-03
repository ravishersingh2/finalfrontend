import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form, Col, Card} from "react-bootstrap";
import { getEachDayData,deleteDayData,addDayData,getFatSecretDetails,getWeekWiseData } from "../actions/weekActions";

class Foodcreator extends Component {
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

    render() {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >

                <Form>
                    <h5>Enter nutrition information below and then add it to your daily food journals.</h5>
                    <Form.Row>
                        <Form.Group as={Col} md="8" controlId="formFoodName">
                            <Form.Label>Food Name</Form.Label>
                            <Form.Control placeholder="Food name (100g)" />
                            <Form.Text>Brand name can be included after serving size.</Form.Text>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formCalories">
                            <Form.Label>Calories</Form.Label>
                            <Form.Control type="number" placeholder="kCal per serving" />
                        </Form.Group>

                    </Form.Row>

                    <Form.Row>

                        <Form.Group as={Col} controlId="formCarbs">
                            <Form.Label>Carbs (g)</Form.Label>
                            <Form.Control type="number" placeholder="g per serving" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="forProtein">
                            <Form.Label>Protein (g)</Form.Label>
                            <Form.Control type="number" placeholder="g per serving" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formFat">
                            <Form.Label>Fat (g)</Form.Label>
                            <Form.Control type="number" placeholder="g per serving" />
                        </Form.Group>

                    </Form.Row>

                    <Form.Row>

                        <Form.Group as={Col} controlId="formSodium">
                            <Form.Label>Sodium (mg)</Form.Label>
                            <Form.Control type="number" placeholder="mg per serving" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formFiber">
                            <Form.Label>Fiber (g)</Form.Label>
                            <Form.Control type="number" placeholder="g per serving" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formSugar">
                            <Form.Label>Sugar (g)</Form.Label>
                            <Form.Control type="number" placeholder="g per serving" />
                        </Form.Group>

                    </Form.Row>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
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

export default connect(mapStateToProps)(Foodcreator);