import React from 'react';
import axios from 'Helper/axios';
import {toast} from 'react-toastify'

class AddInventory extends React.Component{

    state = {
        name: '',
        price: 0,
        tags: '',
        image: '',
        status: 'available'
    }

    handelChange = e => {
        const value = e.target.value;
        const name = e.target.name; 
        this.setState({
            [name]: value,
        })
    }

    submit = e => {
        e.preventDefault();
        const product = {...this.state};
        axios.post('products', product).then( res => {
            this.props.close(res.data);
            toast.success('Add Success');
        })
    }

    render(){
        return (
            <div className="inventory">
                <p className="title has-text-centered">AddInventory</p>
                <br />
                <form onSubmit={this.submit}>
                    <div className="field has-text-left has-text-left">
                        <div className="control">
                            <label htmlFor="" className="label">Name</label>
                            <textarea name="name" className='textarea' value={this.state.name} onChange={this.handelChange}/>
                        </div>
                    </div>
                    <div className="field has-text-left">
                        <div className="control">
                            <label htmlFor="" className="label">Price</label>
                            <input type="number" name="price" className="input" value={this.state.price} onChange={this.handelChange} />
                        </div>
                    </div>
                    <div className="field has-text-left">
                        <div className="control">
                            <label htmlFor="" className="label">Tags</label>
                            <input type="text" name="tags" className="input" value={this.state.tags} onChange={this.handelChange} />
                        </div>
                    </div>
                    <div className="field has-text-left">
                        <div className="control">
                            <label htmlFor="" className="label">Images</label>
                            <input type="text" name="image" className="input" value={this.state.image} onChange={this.handelChange} />
                        </div>
                    </div>
                    <div className="field has-text-left">
                        <div className="control">
                            <label htmlFor="" className="label">Status</label>
                            <div className="select is-full-width">
                                <select name="status" value={this.state.status} onChange={this.handelChange}>
                                    <option>available</option>
                                    <option>unavailable</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="field is-grouped is-grouped-centered">
                        <div className="control">
                            <button className="button is-link">Submit</button>
                        </div>
                        <div className="control">
                            <button className="button" type='button' onClick={ () => {this.props.close()}}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddInventory;