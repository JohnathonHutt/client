//jshint esversion:6

import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    const clientsList = [{name: "wolverines", clicks: 0, active: true, id: 1}, {name: "spartans", clicks: 0, active: true, id: 2}, {name: "sandworms", clicks: 0, active: true, id: 3}];
    this.state = {
      referralClients: clientsList,
      renderHome: true,
      currentName: "wolverines",
      term: "",
      order: clientsList.length
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.editListItem = this.editListItem.bind(this);
    this.deleteListItem = this.deleteListItem.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    let newClient = {
      id: this.state.order,
      text: this.state.term,
    };

    if (this.state.term !== "") {
      this.setState({
        term: "",
        referralClients: [...this.state.referralClients, newClient],
        order: this.state.order + 1,
      });
    }
  }

  handleChange(event) {
   this.setState({term: event.target.value});
  }

  handleLinkClick(id) {
    //update clicks count

    //possibly refactor all onClicks through an onClick handler w/ helper methods
    console.log("handle link click: " + id);
  }

  editListItem(id) {
    //add edit feature
    console.log("edit: " + id);
  }

  deleteListItem(id) {
    //delete item
    console.log("delete list item: " + id);
  }

  render() {

    if (this.state.renderHome) {
      return (
        <Home
          onSubmit={this.onSubmit}
          term={this.state.term}
          handleChange={this.handleChange}
          referralClients={this.state.referralClients}
          handleLinkClick={this.handleLinkClick}
          editListItem={this.editListItem}
          deleteListItem={this.deleteListItem}
        />
      );
    }
    return (
      <Landing currentName={this.state.currentName} />
    );
  }
}

function Home(props) {
  //Home page
  return (
    <div>
      <h1>Grow the web with referrals!</h1>
      <AddNew onSubmit={props.onSubmit} term={props.term} handleChange={props.handleChange} />
      <List referralClients={props.referralClients} handleLinkClick={props.handleLinkClick} editListItem={props.editListItem} deleteListItem={props.deleteListItem} />
    </div>
  );
}

function AddNew(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <input className="input-text" value={props.term} onChange={props.handleChange} />
      <button className="btn add-btn">+</button>
    </form>
  );
}

function List(props) {
  return (
    <div className="table-wrapper">
      <table>
        <tr>
          <th>
            <td>Link Title</td>
            <td>Clicks</td>
            <td>Edit</td>
            <td>Delete</td>
          </th>
        </tr>

          {props.referralClients.map((client) => (
            <tr>
              <td>
                <a href={"/" + client.name} onClick={() => props.handleLinkClick(client.id)}>{client.name}</a>
              </td>
              <td>
                {client.clicks}
              </td>
              <td onClick={() => props.editListItem(client.id)}>
                Edit
              </td>
              <td onClick={() => props.deleteListItem(client.id)}>
                Delete
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
}

function Landing(props) {
  //Landing page
  return (
    <div>
      <h1>{props.currentName} is the best!</h1>
      <h2>Come join your fellow web-heads on the World Wide Web!</h2>
      <img src="https://cdn.vox-cdn.com/thumbor/up9Mk1FY99BPcDxD9bA2YeRlKZE=/0x0:2640x1760/1200x800/filters:focal(1075x432:1497x854)/cdn.vox-cdn.com/uploads/chorus_image/image/65152362/spider.0.jpg" />
    </div>
  );
}


export default App;
