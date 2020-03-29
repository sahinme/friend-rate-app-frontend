import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import { answers, properties } from "../properties";
import userService from "../services/userService";
import Progress from "./progress";

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
    setHelperText(" ");
    setError(false);
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
  };

  return user.succes ? (
    <form onSubmit={handleSubmit}>
      <FormControl
        component="fieldset"
        error={error}
        className={classes.formControl}
      >
        <FormLabel component="legend">{questions[counter].title}</FormLabel>
        <RadioGroup
          aria-label="position"
          name="position"
          value={parseInt(value)}
          onChange={handleRadioChange}
        >
          {answers.map(item => {
            return (
              <FormControlLabel
                value={item.id}
                control={<Radio color="primary" />}
                label={item.value}
              />
            );
          })}
        </RadioGroup>
        {isVoteEnded &&
          questions.map(item => {
            return (
              <FormHelperText>
                soru : {item.title} <br /> cevap : <p> {item.score} </p>
              </FormHelperText>
            );
          })}
        {isVoteEnded ? (
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Oylamayi bitir
          </Button>
        ) : (
          <div>
            {counter > 0 && (
              <Button
                onClick={handlePrev}
                variant="outlined"
                color="danger"
                className={classes.button}
              >
                Geri
              </Button>
            )}
            <Button
              disabled={!value}
              type="submit"
              variant="outlined"
              color="primary"
              className={classes.button}
            >
              İleri
            </Button>
          </div>
        )}
      </FormControl>
    </form>
  ) : (
    <Progress />
  );
}
