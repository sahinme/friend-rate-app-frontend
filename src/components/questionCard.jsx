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
import { answers, properties } from "../properties";
import userService from "../services/userService";
import Progress from "./progress";
import ResultBar from "./resultBar";
import ImageAvatar from "./avatar";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0)
  }
}));

export default function QuestionPage(props) {
  const classes = useStyles();
  const [user, setUser] = React.useState({});
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("Choose wisely");
  const [questions, setQuestionValue] = React.useState([...properties]);
  const [counter, setCounter] = React.useState(0);
  const [isVoteEnded, setVodeEnded] = React.useState(false);
  const [isClickedEnd, setEndClick] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await userService.getUserByName(props.username);
      setUser(result.data);
    };
    fetchData();
  }, []);

  const handleRadioChange = event => {
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

  const handleSubmit = event => {
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

  const handleEndVote = () => {
    setEndClick(true);
  };

  return user.succes ? (
    <form onSubmit={handleSubmit}>
      <FormControl
        component="fieldset"
        error={error}
        className={classes.formControl}
      >
        {isClickedEnd ? (
          questions.map(item => {
            return (
              <ResultBar
                text={item.title}
                color={"#" + (((1 << 24) * Math.random()) | 0).toString(16)}
                value={item.score * 20}
              />
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
                <FormLabel component="legend">
                  {user.result.username + " " + questions[counter].title}
                </FormLabel>
                <RadioGroup
                  aria-label="position"
                  name="position"
                  value={parseInt(value)}
                  onChange={handleRadioChange}
                >
                  {answers.map(item => {
                    return (
                      <FormControlLabel
                        style={{
                          backgroundColor: value == item.id ? "brown" : "",
                          boxShadow:
                            "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)"
                        }}
                        value={item.id}
                        control={<Radio color="primary" />}
                        label={`${item.value} (${item.label})`}
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
    <Progress />
  );
}
