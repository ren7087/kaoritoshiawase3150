import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  ImageList,
  ImageListItem,
  Modal,
  Radio,
  RadioGroup,
  Tooltip,
} from "@mui/material";
import { firebaseApp } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAuthContext } from "../context/AuthContext";
import { useHistory, Redirect } from "react-router-dom";
import { Container } from "@mui/system";
import {
  blue,
  green,
  grey,
  indigo,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow,
} from "@mui/material/colors";
import { useWindowSize } from "../hooks/useWindowSize";

const steps = [
  "Color",
  "Reason",
  "Color",
  "Reason",
  "Color",
  "Reason",
  "Feeling",
  "Where",
  "Dislike",
  "Like",
  "Weight",
  "Strong",
  "Your",
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const db = firebaseApp.firestore;

export default function Contact() {
  const [width, height] = useWindowSize();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [formInput, updateFormInput] = React.useState({
    principleColor: "",
    principleReason: "",
    neutralColor: "",
    neutralReason: "",
    nonColored: "",
    nonReason: "",
    feeling: "",
    where: "",
    dislike: "",
    like: "",
    weight: "",
    strong: "",
    your: "",
  });
  const { user } = useAuthContext();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const controlProps = (item) => ({
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  const handleOnSubmit = async () => {
    await setDoc(doc(db, "questionnaires", `${user.email}`), {
      principleColor: formInput.principleColor,
      principleReason: formInput.principleReason,
      neutralColor: formInput.neutralColor,
      neutralReason: formInput.neutralReason,
      nonColored: formInput.nonColored,
      nonReason: formInput.nonReason,
      feeling: formInput.feeling,
      where: formInput.where,
      dislike: formInput.dislike,
      like: formInput.like,
      weight: formInput.weight,
      strong: formInput.strong,
      your: formInput.your,
    });
    history.push("/result");
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  if (!user) {
    return <Redirect to="/login" />;
  } else {
    return (
      <Box sx={{ width: "90%", marginTop: "40px" }}>
        {width >= 860 && (
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        )}
        {width < 860 && (
          <>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps} style={{ margin: "-2px" }}>
                    <StepLabel {...labelProps}></StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </>
        )}
        {activeStep === steps.length ? (
          <React.Fragment>
            {/* <Container style={{ textAlign: "center" }}>
							<Typography
								variant="h5"
								sx={{
									marginTop: "50px",
									fontWeight: "bold",
								}}
							>
								????????????
							</Typography>
							<Button
								onClick={handleReset}
								variant="outlined"
								style={{ width: "60px", height: "40px", margin: "20px" }}
							>
								Reset
							</Button>
							<Button
								onClick={handleOnSubmit}
								variant="contained"
								style={{ width: "60px", height: "40px", margin: "20px" }}
							>
								submit
							</Button>
						</Container> */}
            <Container style={{ textAlign: "center" }}>
              <Typography
                variant="h5"
                sx={{
                  marginTop: "50px",
                  fontWeight: "bold",
                }}
              >
                ????????????
              </Typography>
              <Button
                onClick={handleOpen}
                variant="outlined"
                style={{ margin: "20px" }}
              >
                ????????????
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style} style={{ textAlign: "center" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    ????????????????????????????????????
                  </Typography>
                  <Button
                    onClick={handleReset}
                    variant="outlined"
                    style={{ width: "60px", height: "40px", margin: "20px" }}
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={handleOnSubmit}
                    variant="contained"
                    style={{ width: "60px", height: "40px", margin: "20px" }}
                  >
                    ??????
                  </Button>
                </Box>
              </Modal>
            </Container>
            <Card
              sx={{
                minWidth: 275,
                textAlign: "center",
                maxWidth: "80%",
                marginLeft: "10%",
              }}
            >
              <CardContent>
                <Typography
                  variant="body1"
                  style={{
                    fontWeight: "bold",
                    color: "#1976D2",
                    margin: "10px",
                  }}
                >
                  ???????????????????????????????????????????????????
                </Typography>

                <Typography
                  variant="body2"
                  style={{
                    fontWeight: "bold",
                    color: "black",
                    margin: "10px",
                  }}
                >
                  ?????????
                </Typography>
                <Button
                  variant="outlined"
                  style={{
                    backgroundColor: `${formInput.principleColor}`,
                    color: "white",
                    margin: "10px",
                  }}
                >
                  {formInput.principleColor}
                </Button>
                <Typography
                  variant="body2"
                  style={{
                    fontWeight: "bold",
                    color: "black",
                    margin: "10px",
                  }}
                >
                  ?????????
                </Typography>
                <Button
                  variant="outlined"
                  style={{
                    backgroundColor: `${formInput.neutralColor}`,
                    color: "white",
                    margin: "10px",
                  }}
                >
                  {formInput.neutralColor}
                </Button>
                <Typography
                  variant="body2"
                  style={{
                    fontWeight: "bold",
                    color: "black",
                    margin: "10px",
                  }}
                >
                  ?????????
                </Typography>
                <Button
                  variant="outlined"
                  style={{
                    backgroundColor: `${formInput.nonColored}`,
                    color: "white",
                    margin: "10px",
                  }}
                >
                  {formInput.nonColored}
                </Button>

                {/* <Typography
									variant="body1"
									style={{
										fontWeight: "bold",
										color: "#87cefa",
										margin: "10px",
									}}
								>
									???????????????positive???negative????????????????????????
								</Typography>
								{formInput.reason === "1" && (
									<Typography
										variant="body2"
										style={{ fontWeight: "bold", margin: "10px" }}
									>
										positive
									</Typography>
								)}
								{formInput.reason === "2" && (
									<Typography
										variant="body2"
										style={{ fontWeight: "bold", margin: "10px" }}
									>
										negative
									</Typography>
								)} */}

                <Typography
                  variant="body1"
                  style={{
                    fontWeight: "bold",
                    color: "#1976D2",
                    margin: "10px",
                  }}
                >
                  ???????????????????????????????????????
                </Typography>
                {formInput.feeling === "1" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ??????
                  </Typography>
                )}
                {formInput.feeling === "2" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ?????????
                  </Typography>
                )}
                {formInput.feeling === "3" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ?????????
                  </Typography>
                )}
                {formInput.feeling === "4" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ?????????????????????
                  </Typography>
                )}
                {formInput.feeling === "5" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ??????
                  </Typography>
                )}
                {formInput.feeling === "6" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ??????
                  </Typography>
                )}
                {formInput.feeling === "7" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ??????????????????
                  </Typography>
                )}
                {formInput.feeling === "8" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ?????????
                  </Typography>
                )}
                {formInput.feeling === "9" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ??????
                  </Typography>
                )}
                {formInput.feeling === "10" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ??????
                  </Typography>
                )}
                {formInput.feeling === "11" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ?????????
                  </Typography>
                )}
                {formInput.feeling === "12" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ?????????
                  </Typography>
                )}
                {formInput.feeling === "13" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ?????????
                  </Typography>
                )}
                {formInput.feeling === "14" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ??????
                  </Typography>
                )}
                {formInput.feeling === "15" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ??????
                  </Typography>
                )}
                {formInput.feeling === "16" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ?????????
                  </Typography>
                )}
                {formInput.feeling === "17" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ????????????
                  </Typography>
                )}
                {formInput.feeling === "18" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ??????
                  </Typography>
                )}

                <Typography
                  variant="body1"
                  style={{
                    fontWeight: "bold",
                    color: "#87cefa",
                    margin: "10px",
                  }}
                >
                  ?????????????????????????????????
                </Typography>
                {formInput.where === "1" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ??????
                  </Typography>
                )}
                {formInput.where === "2" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ????????????
                  </Typography>
                )}
                {formInput.where === "3" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ?????????
                  </Typography>
                )}
                {formInput.where === "4" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ??????
                  </Typography>
                )}

                <Typography
                  variant="body1"
                  style={{
                    fontWeight: "bold",
                    color: "#1976D2",
                    margin: "10px",
                  }}
                >
                  ???????????????????????????????????????
                </Typography>
                {formInput.dislike === "1" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ????????????
                  </Typography>
                )}
                {formInput.dislike === "2" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ?????????
                  </Typography>
                )}
                {formInput.dislike === "3" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ??????
                  </Typography>
                )}

                <Typography
                  variant="body1"
                  style={{
                    fontWeight: "bold",
                    color: "#87cefa",
                    margin: "10px",
                  }}
                >
                  ??????????????????????????????????????????????????????
                </Typography>
                {formInput.like === "1" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ????????????
                  </Typography>
                )}
                {formInput.like === "2" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ?????????
                  </Typography>
                )}
                {formInput.like === "3" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ??????
                  </Typography>
                )}

                <Typography
                  variant="body1"
                  style={{
                    fontWeight: "bold",
                    color: "#1976D2",
                    margin: "10px",
                  }}
                >
                  ????????????????????????????????????????????????
                </Typography>
                {formInput.weight === "1" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ??????????????????
                  </Typography>
                )}
                {formInput.weight === "2" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ?????????
                  </Typography>
                )}
                {formInput.weight === "3" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ?????????
                  </Typography>
                )}
                {formInput.weight === "4" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ??????????????????
                  </Typography>
                )}

                <Typography
                  variant="body1"
                  style={{
                    fontWeight: "bold",
                    color: "#87cefa",
                    margin: "10px",
                  }}
                >
                  ????????????????????????????????????????????????
                </Typography>
                {formInput.strong === "1" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ?????????????????????
                  </Typography>
                )}
                {formInput.strong === "2" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ????????????
                  </Typography>
                )}
                {formInput.strong === "3" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ??????
                  </Typography>
                )}
                {formInput.strong === "4" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ???????????????
                  </Typography>
                )}

                <Typography
                  variant="body1"
                  style={{
                    fontWeight: "bold",
                    color: "#1976D2",
                    margin: "10px",
                  }}
                >
                  ??????????????????????????????????
                </Typography>
                {formInput.your === "1" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ????????????????????????
                  </Typography>
                )}
                {formInput.your === "2" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ?????????
                  </Typography>
                )}
                {formInput.your === "3" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ???????????????????????????
                  </Typography>
                )}
                {formInput.your === "4" && (
                  <Typography
                    variant="body2"
                    style={{ fontWeight: "bold", margin: "10px" }}
                  >
                    ?????????????????????
                  </Typography>
                )}
              </CardContent>
            </Card>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Card
              sx={{
                minWidth: 275,
                maxWidth: "70%",
                marginLeft: "18%",
                marginTop: "50px",
              }}
            >
              <CardContent>
                {activeStep === 0 ? (
                  <div style={{ textAlign: "center" }}>
                    <FormControl>
                      <Typography
                        style={{
                          marginBottom: "30px",
                          fontWeight: "bold",
                          color: "#1976D2",
                        }}
                      >
                        ???????????????????????????????????????????????????
                      </Typography>
                      <FormLabel
                        id="demo-controlled-radio-buttons-group"
                        style={{
                          marginBottom: "20px",
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        ?????????
                      </FormLabel>
                      <RadioGroup
                        value={formInput.principleColor}
                        onChange={(e) =>
                          updateFormInput({
                            ...formInput,
                            principleColor: e.target.value,
                          })
                        }
                        row
                        style={{ marginLeft: "13%" }}
                      >
                        <Radio
                          {...controlProps("red")}
                          sx={{
                            color: red[900],
                            "&.Mui-checked": {
                              color: red[600],
                            },
                          }}
                        />
                        <Radio
                          {...controlProps("yellow")}
                          sx={{
                            color: yellow[900],
                            "&.Mui-checked": {
                              color: yellow[600],
                            },
                          }}
                        />
                        <Radio
                          {...controlProps("green")}
                          sx={{
                            color: green[900],
                            "&.Mui-checked": {
                              color: green[600],
                            },
                          }}
                        />
                        <Radio
                          {...controlProps("blue")}
                          sx={{
                            color: blue[900],
                            "&.Mui-checked": {
                              color: blue[600],
                            },
                          }}
                        />
                        <Radio
                          {...controlProps("purple")}
                          sx={{
                            color: purple[900],
                            "&.Mui-checked": {
                              color: purple[600],
                            },
                          }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                ) : null}

                {activeStep === 1 ? (
                  <div style={{ textAlign: "center" }}>
                    <FormControl>
                      <FormLabel
                        id="demo-controlled-radio-buttons-group"
                        style={{
                          marginBottom: "30px",
                          fontWeight: "bold",
                          color: "#1976D2",
                        }}
                      >
                        ???????????????positive???negative????????????????????????
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={formInput.principleReason}
                        onChange={(e) =>
                          updateFormInput({
                            ...formInput,
                            principleReason: e.target.value,
                          })
                        }
                        style={{ marginLeft: "29%" }}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="???????????????"
                        />
                        <FormControlLabel
                          value="0"
                          control={<Radio />}
                          label="???????????????"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                ) : null}

                {activeStep === 2 ? (
                  <div style={{ textAlign: "center" }}>
                    <FormControl>
                      <Typography
                        style={{
                          marginBottom: "30px",
                          fontWeight: "bold",
                          color: "#1976D2",
                        }}
                      >
                        ???????????????????????????????????????????????????
                      </Typography>
                      <FormLabel
                        id="demo-controlled-radio-buttons-group"
                        style={{
                          marginBottom: "20px",
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        ?????????
                      </FormLabel>
                      <RadioGroup
                        value={formInput.neutralColor}
                        onChange={(e) =>
                          updateFormInput({
                            ...formInput,
                            neutralColor: e.target.value,
                          })
                        }
                        row
                        style={{ marginLeft: "20%" }}
                      >
                        <Radio
                          {...controlProps("orange")}
                          sx={{
                            color: orange[600],
                            "&.Mui-checked": {
                              color: orange[300],
                            },
                          }}
                        />
                        <Radio
                          {...controlProps("lime")}
                          sx={{
                            color: lime[600],
                            "&.Mui-checked": {
                              color: lime[300],
                            },
                          }}
                        />
                        <Radio
                          {...controlProps("teal")}
                          sx={{
                            color: teal[600],
                            "&.Mui-checked": {
                              color: teal[300],
                            },
                          }}
                        />
                        <Radio
                          {...controlProps("indigo")}
                          sx={{
                            color: indigo[600],
                            "&.Mui-checked": {
                              color: indigo[300],
                            },
                          }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                ) : null}

                {activeStep === 3 ? (
                  <div style={{ textAlign: "center" }}>
                    <FormControl>
                      <FormLabel
                        id="demo-controlled-radio-buttons-group"
                        style={{
                          marginBottom: "30px",
                          fontWeight: "bold",
                          color: "#1976D2",
                        }}
                      >
                        ???????????????positive???negative????????????????????????
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={formInput.neutralReason}
                        onChange={(e) =>
                          updateFormInput({
                            ...formInput,
                            neutralReason: e.target.value,
                          })
                        }
                        style={{ marginLeft: "29%" }}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="???????????????"
                        />
                        <FormControlLabel
                          value="0"
                          control={<Radio />}
                          label="???????????????"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                ) : null}

                {activeStep === 4 ? (
                  <div style={{ textAlign: "center" }}>
                    <FormControl>
                      <Typography
                        style={{
                          marginBottom: "30px",
                          fontWeight: "bold",
                          color: "#1976D2",
                        }}
                      >
                        ???????????????????????????????????????????????????
                      </Typography>
                      <FormLabel
                        id="demo-controlled-radio-buttons-group"
                        style={{
                          marginBottom: "20px",
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        ?????????
                      </FormLabel>
                      <RadioGroup
                        value={formInput.nonColored}
                        onChange={(e) =>
                          updateFormInput({
                            ...formInput,
                            nonColored: e.target.value,
                          })
                        }
                        row
                        style={{ marginLeft: "20%" }}
                      >
                        <Radio
                          {...controlProps("redPurpule")}
                          sx={{
                            color: pink[900],
                            "&.Mui-checked": {
                              color: pink[900],
                            },
                          }}
                        />
                        <Radio
                          {...controlProps("white")}
                          sx={{
                            color: grey[300],
                            "&.Mui-checked": {
                              color: grey[300],
                            },
                          }}
                        />
                        <Radio
                          {...controlProps("gray")}
                          sx={{
                            color: grey[600],
                            "&.Mui-checked": {
                              color: grey[600],
                            },
                          }}
                        />
                        <Radio
                          {...controlProps("black")}
                          sx={{
                            color: grey[900],
                            "&.Mui-checked": {
                              color: grey[900],
                            },
                          }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                ) : null}

                {activeStep === 5 ? (
                  <div style={{ textAlign: "center" }}>
                    <FormControl>
                      <FormLabel
                        id="demo-controlled-radio-buttons-group"
                        style={{
                          marginBottom: "30px",
                          fontWeight: "bold",
                          color: "#1976D2",
                        }}
                      >
                        ???????????????positive???negative????????????????????????
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={formInput.nonReason}
                        onChange={(e) =>
                          updateFormInput({
                            ...formInput,
                            nonReason: e.target.value,
                          })
                        }
                        style={{ marginLeft: "29%" }}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="???????????????"
                        />
                        <FormControlLabel
                          value="0"
                          control={<Radio />}
                          label="???????????????"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                ) : null}

                {/* red&negative */}
                {formInput.principleColor === "red" &&
                Number(formInput.principleReason) +
                  Number(formInput.neutralReason) +
                  Number(formInput.nonReason) <
                  2 &&
                activeStep === 6 ? (
                  <div style={{ textAlign: "center" }}>
                    <FormControl>
                      <FormLabel
                        id="demo-controlled-radio-buttons-group"
                        style={{
                          marginBottom: "30px",
                          fontWeight: "bold",
                          color: "#1976D2",
                        }}
                      >
                        ???????????????????????????????????????
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={formInput.feeling}
                        onChange={(e) =>
                          updateFormInput({
                            ...formInput,
                            feeling: e.target.value,
                          })
                        }
                        style={{ marginLeft: "29%" }}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="??????"
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="?????????"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                ) : null}

                {/* red&positive */}
                {formInput.principleColor === "red" &&
                Number(formInput.principleReason) +
                  Number(formInput.neutralReason) +
                  Number(formInput.nonReason) >=
                  2 &&
                activeStep === 6 ? (
                  <div style={{ textAlign: "center" }}>
                    <FormControl>
                      <FormLabel
                        id="demo-controlled-radio-buttons-group"
                        style={{
                          marginBottom: "30px",
                          fontWeight: "bold",
                          color: "#1976D2",
                        }}
                      >
                        ???????????????????????????????????????
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={formInput.feeling}
                        onChange={(e) =>
                          updateFormInput({
                            ...formInput,
                            feeling: e.target.value,
                          })
                        }
                        style={{ marginLeft: "29%" }}
                      >
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="?????????"
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="?????????????????????"
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="??????"
                        />
                        <FormControlLabel
                          value="6"
                          control={<Radio />}
                          label="??????"
                        />
                        <FormControlLabel
                          value="7"
                          control={<Radio />}
                          label="??????????????????"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                ) : null}

                {/* yellow&negative */}
                {formInput.principleColor === "yellow" &&
                Number(formInput.principleReason) +
                  Number(formInput.neutralReason) +
                  Number(formInput.nonReason) <
                  2 &&
                activeStep === 6 ? (
                  <div style={{ textAlign: "center" }}>
                    <FormControl>
                      <FormLabel
                        id="demo-controlled-radio-buttons-group"
                        style={{
                          marginBottom: "30px",
                          fontWeight: "bold",
                          color: "#1976D2",
                        }}
                      >
                        ???????????????????????????????????????
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={formInput.feeling}
                        onChange={(e) =>
                          updateFormInput({
                            ...formInput,
                            feeling: e.target.value,
                          })
                        }
                        style={{ marginLeft: "29%" }}
                      >
                        <FormControlLabel
                          value="8"
                          control={<Radio />}
                          label="?????????"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                ) : null}

                {/* yellow&positive */}
                {formInput.principleColor === "yellow" &&
                Number(formInput.principleReason) +
                  Number(formInput.neutralReason) +
                  Number(formInput.nonReason) >=
                  2 &&
                activeStep === 6 ? (
                  <div style={{ textAlign: "center" }}>
                    <FormControl>
                      <FormLabel
                        id="demo-controlled-radio-buttons-group"
                        style={{
                          marginBottom: "30px",
                          fontWeight: "bold",
                          color: "#1976D2",
                        }}
                      >
                        ???????????????????????????????????????
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={formInput.feeling}
                        onChange={(e) =>
                          updateFormInput({
                            ...formInput,
                            feeling: e.target.value,
                          })
                        }
                        style={{ marginLeft: "29%" }}
                      >
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="?????????????????????"
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="??????"
                        />
                        <FormControlLabel
                          value="6"
                          control={<Radio />}
                          label="??????"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                ) : null}

                {/* green&positive */}
                {formInput.principleColor === "green" &&
                Number(formInput.principleReason) +
                  Number(formInput.neutralReason) +
                  Number(formInput.nonReason) >=
                  2 &&
                activeStep === 6 ? (
                  <div style={{ textAlign: "center" }}>
                    <FormControl>
                      <FormLabel
                        id="demo-controlled-radio-buttons-group"
                        style={{
                          marginBottom: "30px",
                          fontWeight: "bold",
                          color: "#1976D2",
                        }}
                      >
                        ???????????????????????????????????????
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={formInput.feeling}
                        onChange={(e) =>
                          updateFormInput({
                            ...formInput,
                            feeling: e.target.value,
                          })
                        }
                        style={{ marginLeft: "29%" }}
                      >
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="?????????"
                        />
                        <FormControlLabel
                          value="18"
                          control={<Radio />}
                          label="??????"
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="??????"
                        />
                        <FormControlLabel
                          value="6"
                          control={<Radio />}
                          label="??????"
                        />
                        <FormControlLabel
                          value="9"
                          control={<Radio />}
                          label="??????"
                        />
                        <FormControlLabel
                          value="10"
                          control={<Radio />}
                          label="??????"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                ) : null}

                {/* blue&negative */}
                {formInput.principleColor === "blue" &&
                Number(formInput.principleReason) +
                  Number(formInput.neutralReason) +
                  Number(formInput.nonReason) <
                  2 &&
                activeStep === 6 ? (
                  <div style={{ textAlign: "center" }}>
                    <FormControl>
                      <FormLabel
                        id="demo-controlled-radio-buttons-group"
                        style={{
                          marginBottom: "30px",
                          fontWeight: "bold",
                          color: "#1976D2",
                        }}
                      >
                        ???????????????????????????????????????
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={formInput.feeling}
                        onChange={(e) =>
                          updateFormInput({
                            ...formInput,
                            feeling: e.target.value,
                          })
                        }
                        style={{ marginLeft: "29%" }}
                      >
                        <FormControlLabel
                          value="11"
                          control={<Radio />}
                          label="?????????"
                        />
                        <FormControlLabel
                          value="12"
                          control={<Radio />}
                          label="?????????"
                        />
                        <FormControlLabel
                          value="13"
                          control={<Radio />}
                          label="?????????"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                ) : null}

                {/* blue&positive */}
                {formInput.principleColor === "blue" &&
                Number(formInput.principleReason) +
                  Number(formInput.neutralReason) +
                  Number(formInput.nonReason) >=
                  2 &&
                activeStep === 6 ? (
                  <div style={{ textAlign: "center" }}>
                    <FormControl>
                      <FormLabel
                        id="demo-controlled-radio-buttons-group"
                        style={{
                          marginBottom: "30px",
                          fontWeight: "bold",
                          color: "#1976D2",
                        }}
                      >
                        ???????????????????????????????????????
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={formInput.feeling}
                        onChange={(e) =>
                          updateFormInput({
                            ...formInput,
                            feeling: e.target.value,
                          })
                        }
                        style={{ marginLeft: "29%" }}
                      >
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="?????????"
                        />
                        <FormControlLabel
                          value="18"
                          control={<Radio />}
                          label="??????"
                        />
                        <FormControlLabel
                          value="6"
                          control={<Radio />}
                          label="??????"
                        />
                        <FormControlLabel
                          value="10"
                          control={<Radio />}
                          label="??????"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                ) : null}

                {/* purpule&negative */}
                {formInput.principleColor === "purpule" &&
                Number(formInput.principleReason) +
                  Number(formInput.neutralReason) +
                  Number(formInput.nonReason) <
                  2 &&
                activeStep === 6 ? (
                  <div style={{ textAlign: "center" }}>
                    <FormControl>
                      <FormLabel
                        id="demo-controlled-radio-buttons-group"
                        style={{
                          marginBottom: "30px",
                          fontWeight: "bold",
                          color: "#1976D2",
                        }}
                      >
                        ???????????????????????????????????????
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={formInput.feeling}
                        onChange={(e) =>
                          updateFormInput({
                            ...formInput,
                            feeling: e.target.value,
                          })
                        }
                        style={{ marginLeft: "29%" }}
                      >
                        <FormControlLabel
                          value="14"
                          control={<Radio />}
                          label="??????"
                        />
                        <FormControlLabel
                          value="15"
                          control={<Radio />}
                          label="??????"
                        />
                        <FormControlLabel
                          value="13"
                          control={<Radio />}
                          label="?????????"
                        />
                        <FormControlLabel
                          value="16"
                          control={<Radio />}
                          label="?????????"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                ) : null}

                {/* purpule&positive */}
                {formInput.principleColor === "purpule" &&
                Number(formInput.principleReason) +
                  Number(formInput.neutralReason) +
                  Number(formInput.nonReason) >=
                  2 &&
                activeStep === 6 ? (
                  <div style={{ textAlign: "center" }}>
                    <FormControl>
                      <FormLabel
                        id="demo-controlled-radio-buttons-group"
                        style={{
                          marginBottom: "30px",
                          fontWeight: "bold",
                          color: "#1976D2",
                        }}
                      >
                        ???????????????????????????????????????
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={formInput.feeling}
                        onChange={(e) =>
                          updateFormInput({
                            ...formInput,
                            feeling: e.target.value,
                          })
                        }
                        style={{ marginLeft: "29%" }}
                      >
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="?????????"
                        />
                        <FormControlLabel
                          value="18"
                          control={<Radio />}
                          label="??????"
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="??????"
                        />
                        <FormControlLabel
                          value="6"
                          control={<Radio />}
                          label="??????"
                        />
                        <FormControlLabel
                          value="17"
                          control={<Radio />}
                          label="????????????"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                ) : null}

                {activeStep === 7 ? (
                  <div style={{ textAlign: "center" }}>
                    <FormControl sx={{ height: 1 }} style={{ display: "flex" }}>
                      <FormLabel
                        id="demo-controlled-radio-buttons-group"
                        style={{
                          marginBottom: "30px",
                          fontWeight: "bold",
                          color: "#1976D2",
                        }}
                      >
                        ?????????????????????????????????
                      </FormLabel>
                      <RadioGroup
                        value={formInput.where}
                        onChange={(e) =>
                          updateFormInput({
                            ...formInput,
                            where: e.target.value,
                          })
                        }
                        sx={{ height: 1 }}
                      >
                        <ImageList cols={4}>
                          <Tooltip title="??????">
                            <ImageListItem variant="woven">
                              <Radio
                                value="1"
                                icon={
                                  <ImageListItem>
                                    <img src="./img/q14/sleep.jpg" alt="logo" />
                                  </ImageListItem>
                                }
                                checkedIcon={
                                  <ImageListItem sx={{ border: 4 }}>
                                    <img src="./img/check.png" alt="logo" />
                                  </ImageListItem>
                                }
                              />
                            </ImageListItem>
                          </Tooltip>
                          <Tooltip title="????????????">
                            <ImageListItem variant="woven">
                              <Radio
                                value="2"
                                icon={
                                  <ImageListItem>
                                    <img
                                      src="./img/q14/living.jpg"
                                      alt="logo"
                                    />
                                  </ImageListItem>
                                }
                                checkedIcon={
                                  <ImageListItem sx={{ border: 4 }}>
                                    <img src="./img/check.png" alt="logo" />
                                  </ImageListItem>
                                }
                              />
                            </ImageListItem>
                          </Tooltip>
                          <Tooltip title="?????????">
                            <ImageListItem variant="woven">
                              <Radio
                                value="3"
                                icon={
                                  <ImageListItem>
                                    <img src="./img/q14/work.jpg" alt="logo" />
                                  </ImageListItem>
                                }
                                checkedIcon={
                                  <ImageListItem sx={{ border: 4 }}>
                                    <img src="./img/check.png" alt="logo" />
                                  </ImageListItem>
                                }
                              />
                            </ImageListItem>
                          </Tooltip>
                          <Tooltip title="??????">
                            <ImageListItem variant="woven">
                              <Radio
                                value="4"
                                icon={
                                  <ImageListItem>
                                    <img
                                      src="./img/q14/entrance.jpg"
                                      alt="logo"
                                    />
                                  </ImageListItem>
                                }
                                checkedIcon={
                                  <ImageListItem sx={{ border: 4 }}>
                                    <img src="./img/check.png" alt="logo" />
                                  </ImageListItem>
                                }
                              />
                            </ImageListItem>
                          </Tooltip>
                        </ImageList>
                      </RadioGroup>
                    </FormControl>
                  </div>
                ) : null}

                {activeStep === 8 ? (
                  <div style={{ textAlign: "center" }}>
                    <FormControl>
                      <FormLabel
                        id="demo-controlled-radio-buttons-group"
                        style={{
                          marginBottom: "30px",
                          fontWeight: "bold",
                          color: "#1976D2",
                        }}
                      >
                        ???????????????????????????????????????
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={formInput.dislike}
                        onChange={(e) =>
                          updateFormInput({
                            ...formInput,
                            dislike: e.target.value,
                          })
                        }
                        style={{ marginLeft: "23%" }}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="????????????"
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="?????????"
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="??????"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                ) : null}

                {activeStep === 9 ? (
                  <div style={{ textAlign: "center" }}>
                    <FormControl>
                      <FormLabel
                        id="demo-controlled-radio-buttons-group"
                        style={{
                          marginBottom: "30px",
                          fontWeight: "bold",
                          color: "#1976D2",
                        }}
                      >
                        ??????????????????????????????????????????????????????
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={formInput.like}
                        onChange={(e) =>
                          updateFormInput({
                            ...formInput,
                            like: e.target.value,
                          })
                        }
                        style={{ marginLeft: "29%" }}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="????????????"
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="?????????"
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="??????"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                ) : null}

                {activeStep === 10 ? (
                  <div style={{ textAlign: "center" }}>
                    <FormControl>
                      <FormLabel
                        id="demo-controlled-radio-buttons-group"
                        style={{
                          marginBottom: "30px",
                          fontWeight: "bold",
                          color: "#1976D2",
                        }}
                      >
                        ??????????????????<span style={{ color: "red" }}>??????</span>
                        ????????????????????????
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={formInput.weight}
                        onChange={(e) =>
                          updateFormInput({
                            ...formInput,
                            weight: e.target.value,
                          })
                        }
                        style={{ marginLeft: "20%" }}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="??????????????????"
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="?????????"
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="?????????"
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="??????????????????"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                ) : null}

                {activeStep === 11 ? (
                  <div style={{ textAlign: "center" }}>
                    <FormControl>
                      <FormLabel
                        id="demo-controlled-radio-buttons-group"
                        style={{
                          marginBottom: "30px",
                          fontWeight: "bold",
                          color: "#1976D2",
                        }}
                      >
                        ??????????????????<span style={{ color: "red" }}>??????</span>
                        ????????????????????????
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={formInput.strong}
                        onChange={(e) =>
                          updateFormInput({
                            ...formInput,
                            strong: e.target.value,
                          })
                        }
                        style={{ marginLeft: "20%" }}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="????????????????????? "
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="????????????"
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="??????"
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="???????????????"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                ) : null}

                {activeStep === 12 ? (
                  <div style={{ textAlign: "center" }}>
                    <FormControl sx={{ height: 1 }} style={{ display: "flex" }}>
                      <FormLabel
                        id="demo-controlled-radio-buttons-group"
                        style={{
                          marginBottom: "30px",
                          fontWeight: "bold",
                          color: "#1976D2",
                        }}
                      >
                        ??????????????????????????????????
                      </FormLabel>
                      <RadioGroup
                        value={formInput.your}
                        onChange={(e) =>
                          updateFormInput({
                            ...formInput,
                            your: e.target.value,
                          })
                        }
                        sx={{ height: 1 }}
                      >
                        <ImageList cols={4}>
                          <Tooltip title="????????????????????????">
                            <ImageListItem variant="woven">
                              <Radio
                                value="1"
                                icon={
                                  <ImageListItem>
                                    <img
                                      src="./img/q13/nature.png"
                                      alt="logo"
                                    />
                                  </ImageListItem>
                                }
                                checkedIcon={
                                  <ImageListItem sx={{ border: 4 }}>
                                    <img src="./img/check.png" alt="logo" />
                                  </ImageListItem>
                                }
                              />
                            </ImageListItem>
                          </Tooltip>
                          <Tooltip title="?????????">
                            <ImageListItem variant="woven">
                              <Radio
                                value="2"
                                icon={
                                  <ImageListItem>
                                    <img src="./img/q13/art.png" alt="logo" />
                                  </ImageListItem>
                                }
                                checkedIcon={
                                  <ImageListItem sx={{ border: 4 }}>
                                    <img src="./img/check.png" alt="logo" />
                                  </ImageListItem>
                                }
                              />
                            </ImageListItem>
                          </Tooltip>
                          <Tooltip title="???????????????????????????">
                            <ImageListItem variant="woven">
                              <Radio
                                value="3"
                                icon={
                                  <ImageListItem>
                                    <img src="./img/q13/heart.png" alt="logo" />
                                  </ImageListItem>
                                }
                                checkedIcon={
                                  <ImageListItem sx={{ border: 4 }}>
                                    <img src="./img/check.png" alt="logo" />
                                  </ImageListItem>
                                }
                              />
                            </ImageListItem>
                          </Tooltip>
                          <Tooltip title="?????????????????????">
                            <ImageListItem variant="woven">
                              <Radio
                                value="4"
                                icon={
                                  <ImageListItem>
                                    <img
                                      src="./img/q13/memory.png"
                                      alt="logo"
                                    />
                                  </ImageListItem>
                                }
                                checkedIcon={
                                  <ImageListItem sx={{ border: 4 }}>
                                    <img src="./img/check.png" alt="logo" />
                                  </ImageListItem>
                                }
                              />
                            </ImageListItem>
                          </Tooltip>
                        </ImageList>
                      </RadioGroup>
                    </FormControl>
                  </div>
                ) : null}
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    variant="contained"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />

                  <Button
                    onClick={handleNext}
                    variant="contained"
                    disabled={
                      (activeStep === 0 && formInput.principleColor === "") ||
                      (activeStep === 1 && formInput.principleReason === "") ||
                      (activeStep === 2 && formInput.neutralColor === "") ||
                      (activeStep === 3 && formInput.neutralReason === "") ||
                      (activeStep === 4 && formInput.nonColored === "") ||
                      (activeStep === 5 && formInput.nonReason === "") ||
                      (activeStep === 6 && formInput.feeling === "") ||
                      (activeStep === 7 && formInput.where === "") ||
                      (activeStep === 8 && formInput.dislike === "") ||
                      (activeStep === 9 && formInput.like === "") ||
                      (activeStep === 10 && formInput.weight === "") ||
                      (activeStep === 11 && formInput.strong === "") ||
                      (activeStep === 12 && formInput.your === "")
                    }
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </React.Fragment>
        )}
      </Box>
    );
  }
}
