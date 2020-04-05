import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Paper from "@material-ui/core/Paper";
import { withRouter, useHistory } from "react-router-dom";
import { Button, Chip } from "@material-ui/core";
import ResultModal from "./resultModal";
import voteService from "services/voteService";
import moment from "moment";
import "moment/locale/tr";
import Progress from "./progress";
import { readLocalStorage, removeLocalStorage } from "helper";
import { LightTooltip } from "./lightTooltip";

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5),
  },
}));

function Home(props) {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [votes, setVotes] = useState([]);
  const [selectedVote, setSelectedVote] = useState({});
  const [voterName, setVoterName] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const user = readLocalStorage("user");
    const fetchData = async () => {
      setLoading(true);
      const result = await voteService.getUserVotes(user.username);
      setVotes(result.data.result);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSelect = (id) => {
    const vote = votes.find((x) => x.id == id);
    const temp = { ...vote };
    setVoterName(vote.voterName);
    delete temp.id;
    delete temp.createdDateTime;
    delete temp.voterName;
    delete temp.user;
    setSelectedVote(temp);
  };

  const logOut = async () => {
    await operations();
    history.push("/login");
  };

  const operations = () => {
    removeLocalStorage("token");
    removeLocalStorage("user");
    localStorage.clear();
  };

  const [isModalOpen, setModal] = useState(false);
  return isLoading ? (
    <Progress />
  ) : (
    <React.Fragment>
      <Container style={{ display: "flex", justifyContent: "center" }} fixed>
        <Grid item lg={6} md={6} xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>İsim</TableCell>
                  <TableCell>Oylama Zamanı</TableCell>
                  <TableCell>İncele</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {votes.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Chip
                        className={classes.chip}
                        color={
                          row.voterName === "Anonim" ? "inherit" : "secondary"
                        }
                        label={row.voterName}
                      />
                    </TableCell>
                    <TableCell>
                      {moment(row.createdDateTime).startOf("hour").fromNow()}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          handleSelect(row.id);
                          setModal(true);
                        }}
                        variant="contained"
                        color="primary"
                      >
                        Sonuç Görüntüle
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <span onClick={logOut} style={{ cursor: "pointer" }}>
            <LightTooltip title="Çıkış Yap">
              <ExitToAppIcon color="secondary" fontSize="inherit" />
            </LightTooltip>
          </span>
        </Grid>
      </Container>
      <ResultModal
        isOpen={isModalOpen}
        toggle={() => setModal(!isModalOpen)}
        selectedVote={selectedVote}
        voterName={voterName}
      />
    </React.Fragment>
  );
}

export default withRouter(Home);
