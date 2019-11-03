import React, { Fragment } from "react";
import { useVisualMode } from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

const SHOW = "SHOW";
const EMPTY = "EMPTY";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_D = "ERROR_D";
const ERROR_S = "ERROR_S";



export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer, create) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    console.log("this is create:", create)
    props.bookInterview(props.id, interview, create)
      .then(() => transition(SHOW))
      .catch(err => {
        transition(ERROR_S, true);
      });
  }

  const thisDelete = () => {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(err => {
        transition(ERROR_D, true);
      });
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          toDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={(name, interviewer, create) => save(name, interviewer, create)}
          isSave={true}
        />
      )}
      {mode === SAVING && <Status message="Saving booked interview!" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you ready to delete this fam?"
          onCancel={() => back()}
          onConfirm={() => thisDelete()}
        />
      )}
      {mode === DELETING && <Status message="Deleting interview bro... tltbd!" />}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={(name, interviewer) => save(name, interviewer)}
        />
      )}
      {mode === ERROR_S && <Error message="Error Saving!" onClose={() => back()}/>}
      {mode === ERROR_D && <Error message="Error Deleting!" onClose={() => back()}/>}
    </article>
  );
}