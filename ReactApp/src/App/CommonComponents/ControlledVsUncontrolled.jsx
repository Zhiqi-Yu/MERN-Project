import React from "react";

export default class ControlledVsUncontrolled extends React.Component {
  state = { name: "" };
  refName = React.createRef();

  render() {
    return (
      <div style={{padding:10, border:'1px solid #ddd'}}>
        <h3>Controlled</h3>
        <input
          value={this.state.name}
          onChange={e=>this.setState({name:e.target.value})}
          placeholder="controlled"
        />
        <p>state.name: {this.state.name}</p>

        <h3 style={{marginTop:16}}>Uncontrolled</h3>
        <input ref={this.refName} placeholder="uncontrolled"/>
        <button type="button" onClick={()=>{
          alert('ref value: ' + (this.refName.current?.value || ""));
        }}>Read</button>
      </div>
    );
  }
}
