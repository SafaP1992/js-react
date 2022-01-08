import React from "react";
import {BrowserRouter as Router, Routes , Route} from "react-router-dom";

import Student from "./Pages/Student";
import AddStudent from "./Pages/AddStudent";
import EditStudent from "./Pages/EditStudent";

function App() {
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Student />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/edit-student/:id" element={<EditStudent />} />
        </Routes>
      </Router>
  );
}

export default App;
