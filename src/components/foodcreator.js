import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Col} from "react-bootstrap";
import { getWeekWiseData } from "../actions/weekActions";
import {submitNutrition} from "../actions/creatorActions";

class Foodcreator extends Component {
    state = {};

    componentWillMount() {
        this.props.dispatch(getWeekWiseData({
            userId:localStorage.getItem("userId")
        }))
    }

    constructor(props){
        super(props);

        this.updateDetails = this.updateDetails.bind(this);
        this.submitNutritionData = this.submitNutritionData.bind(this);
        this.state = {
            details:{
                food: '',
                cal: '',
                carb: '',
                prot: '',
                fat: '',
                sod: '',
                fibr: '',
                sugr: ''
            }
        };
    }

    updateDetails(event){
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }
    submitNutritionData(){
        const {dispatch} = this.props;
        dispatch(submitNutrition(this.state.details));
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
                        <Form.Group as={Col} md="8" controlId="food">
                            <Form.Label>Food Name</Form.Label>
                            <Form.Control onChange={this.updateDetails} value={this.state.details.food}placeholder="Food name (100g)" />
                            <Form.Text>Brand name can be included after serving size.</Form.Text>
                        </Form.Group>

                        <Form.Group as={Col} controlId="cal">
                            <Form.Label>Calories</Form.Label>
                            <Form.Control onChange={this.updateDetails} value={this.state.details.cal} type="number" placeholder="kCal per serving" />
                        </Form.Group>

                    </Form.Row>

                    <Form.Row>

                        <Form.Group as={Col} controlId="carb">
                            <Form.Label>Carbs (g)</Form.Label>
                            <Form.Control onChange={this.updateDetails} value={this.state.details.carb} type="number" placeholder="g per serving" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="prot">
                            <Form.Label>Protein (g)</Form.Label>
                            <Form.Control onChange={this.updateDetails} value={this.state.details.prot} type="number" placeholder="g per serving" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="fat">
                            <Form.Label>Fat (g)</Form.Label>
                            <Form.Control onChange={this.updateDetails} value={this.state.details.fat} type="number" placeholder="g per serving" />
                        </Form.Group>

                    </Form.Row>

                    <Form.Row>

                        <Form.Group as={Col} controlId="sod">
                            <Form.Label>Sodium (mg)</Form.Label>
                            <Form.Control onChange={this.updateDetails} value={this.state.details.sod} type="number" placeholder="mg per serving" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="fibr">
                            <Form.Label>Fiber (g)</Form.Label>
                            <Form.Control onChange={this.updateDetails} value={this.state.details.fibr} type="number" placeholder="g per serving" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="sugr">
                            <Form.Label>Sugar (g)</Form.Label>
                            <Form.Control onChange={this.updateDetails} value={this.state.details.sugr} type="number" placeholder="g per serving" />
                        </Form.Group>

                    </Form.Row>

                    <Button onClick={this.submitNutritionData}>
                        Submit
                    </Button>
                </Form>
            </div>


        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(Foodcreator);