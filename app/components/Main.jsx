import React from 'react';
import * as Redux from 'react-redux';
import {GoogleApiWrapper, Marker} from 'google-maps-react';
import axios from 'axios';

import actions from 'actions';

import Header from 'Header';
import Footer from 'Footer';
import Map from 'Map';
import ContentContainer from 'ContentContainer';
import ActionButton from 'ActionButton';
import {toast} from 'Helper';

export var Main = React.createClass({

	componentDidMount() {

			//testing toasts
			toast('Just checking out');

			//fetch user location
			var dispatch = this.props.dispatch;
	    	var coords = axios.get('http://ipinfo.io').then((res) => {
	    		console.log(res.data);
		      if (res.data.loc){
		        try{
		          var latLngArray = res.data.loc.split(',');

		          dispatch(
		          	{
					    type: 'STORE_LOCATION',
					    userLat: latLngArray[0],
					    userLng: latLngArray[1]
					 }
		          );
		        } catch (e){
		          console.log(e);
		        }
		      }
	   		})
	},


	componentWillReceiveProps(nextProps) {

	    if (this.props.google != nextProps.google){
	    	//dispatch google object
	    }

	    if (true){

		}
	},
	
    render() {

   		function renderMarkers() {
   			var locs = [
				{
					id: 1,
					name: 'loc1',
					position: {lat: 37.778519, lng: -122.405640}
				},
				{
					id: 2,
					name: 'loc2',
					position: {lat: 37.759703, lng: -122.428093}
				},
				{
					id: 3,
					name: 'loc3',
					position: {lat: 37.768519, lng: -122.415640}
				}
			];

	   		var markers = locs.map((object, i)=>{
	   			return <Marker position={object.position} name={object.name} key={i} />;
	   		});
	   			
	   		return markers;
   		}

        return (
           	<div className="row overall-container">
           		<Header />
        		<Map google={this.props.google}>
        			{renderMarkers()}
        		</Map>
        		<ContentContainer />
        		<ActionButton />
        		<Footer />
      		</div>
        );
    }
});

export default Redux.connect()(GoogleApiWrapper({
  apiKey: 'AIzaSyBDKoNEeqWSY0MzlUyALFAA2x2hexMrEFs'
})(Main));