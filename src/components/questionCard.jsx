import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import { answers, properties, properties2 } from "../properties";
import userService from "../services/userService";
import Progress from "./progress";
import TextField from "@material-ui/core/TextField";
import ImageAvatar from "./avatar";
import SelectResult from "./selectResult";
import voteService from "services/voteService";
import { Checkbox } from "@material-ui/core";
import { Row } from "reactstrap";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  title: {
    color: "white",
    fontSize: "1.5rem",
    padding: "10px",
  },
}));

export default function QuestionPage(props) {
  const classes = useStyles();
  const [user, setUser] = React.useState({});
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [questions, setQuestionValue] = React.useState([...properties2]);
  const [counter, setCounter] = React.useState(0);
  const [voterName, setVoterName] = React.useState("");
  const [isVoteEnded, setVodeEnded] = React.useState(false);
  const [isClickedEnd, setEndClick] = React.useState(false);
  const [isChecked, setCheckButton] = React.useState(false);
  const [isClickedStarted, setStart] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await userService.getUserByName(props.username);
      setUser(result.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleRadioChange = (event) => {
    questions[counter].score = event.target.value;
    setQuestionValue(questions);
    setValue(event.target.value);
    if (!questions[counter + 1]) {
      setVodeEnded(true);
      return;
    }
    setTimeout(() => {
      setCounter(counter + 1);
      setValue(null);
    }, 100);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue(null);
    if (!questions[counter + 1]) {
      setVodeEnded(true);
      return;
    }
    setCounter(counter + 1);
  };

  const handlePrev = () => {
    setCounter(counter - 1);
    setValue(questions[counter - 1].score);
    setEndClick(false);
    setVodeEnded(false);
  };

  const handleEndVote = async () => {
    setLoading(true);
    const values = {};
    questions.map((item) => {
      const { question } = item;
      values[question] = item.score;
    });
    values.userId = user.result.id;
    if (isChecked) {
      values.voterName = "Anonim";
    } else {
      values.voterName = voterName;
    }
    const result = await voteService.createVote(values);
    if (result.data.success) {
      setLoading(false);
      setEndClick(true);
    }
  };

  const firstScreen = () => {
    return (
      <div>
        <ImageAvatar
          alt={user.result.username}
          src={user.result.profileImagePath}
          className={classes.large}
        />
        <p>{user.result.username}</p>
        <Row>
          <TextField
            style={{ margin: "1rem" }}
            id="outlined-basic"
            value={voterName}
            disabled={isChecked}
            onChange={(e) => setVoterName(e.target.value)}
            id="voterName"
            name="voterName"
            label="Adınız"
            variant="outlined"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked}
                onChange={() => setCheckButton(!isChecked)}
                name="isChecked"
                id="isChecked"
              />
            }
            label="Anonim olarak oyla"
          />
        </Row>
        <Row style={{ justifyContent: "center" }}>
          <Button
            style={{ margin: "1rem" }}
            variant="contained"
            color="secondary"
            disabled={!isChecked && voterName === ""}
            onClick={() => setStart(!isClickedStarted)}
            className={classes.button}
          >
            Başla
          </Button>
        </Row>
      </div>
    );
  };

  if (user.status === 404) {
    return <p>Kullanıcı bulunamadı</p>;
  }

  return !loading ? (
    isClickedStarted ? (
      <form onSubmit={handleSubmit}>
        <FormControl
          component="fieldset"
          error={error}
          className={classes.formControl}
        >
          {isClickedEnd ? (
            questions.map((item) => {
              return (
                <SelectResult item1={item.questionLabel} item2={item.score} />
              );
            })
          ) : (
            <div>
              <ImageAvatar
                alt={user.result.username}
                src={user.result.profileImagePath}
                className={classes.large}
              />
              {!isVoteEnded && (
                <div>
                  {" "}
                  <FormLabel
                    style={{
                      color: "white",
                      fontSize: "1.5rem",
                      padding: "10px",
                    }}
                    component="legend"
                  >
                    {user.result.username +
                      " " +
                      questions[counter].questionLabel}
                  </FormLabel>
                  <RadioGroup
                    aria-label="position"
                    name="position"
                    value={parseInt(value)}
                    onChange={handleRadioChange}
                  >
                    {properties2[counter].answers.map((item) => {
                      return (
                        <FormControlLabel
                          style={{
                            backgroundColor: value == item ? "brown" : "",
                            boxShadow:
                              "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                          }}
                          value={item}
                          control={<Radio color="primary" />}
                          label={`${item}`}
                        />
                      );
                    })}
                  </RadioGroup>
                </div>
              )}
            </div>
          )}

          {isVoteEnded && !isClickedEnd && (
            <Button
              variant="contained"
              color="secondary"
              disable={isClickedEnd}
              onClick={handleEndVote}
              className={classes.button}
            >
              Oylamayi bitir
            </Button>
          )}
          <div>
            {counter > 0 && !isClickedEnd && (
              <IconButton
                onClick={handlePrev}
                color="secondary"
                className={classes.margin}
              >
                <ArrowBackIcon fontSize="large" />
              </IconButton>
            )}
          </div>
        </FormControl>
      </form>
    ) : (
      firstScreen()
    )
  ) : (
    <Progress />
  );
}
