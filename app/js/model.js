// Task model


function Task(seed){
	if(seed){
		this._id = seed._id;
		this.Content = seed.Content;
		this.CreatedDate = seed.CreatedDate;
		this.Status = seed.Status;
		this.User = seed.User;
		this.Owner = seed.Owner;
		
		if(seed.dueDatePart || seed.dueTimePart){
			this.dueDatePart = seed.dueDatePart;
			this.dueTimePart = seed.dueTimePart;
		}
		else if(seed.DueDate){
			this.dueDatePart = moment(seed.DueDate).format('MM/DD/YYYY');
			this.dueTimePart = moment(seed.DueDate).format('h:mm A');
		}
	}
	
	

	/*
	this.__defineGetter__("dateProp",function(){
			return this.DueDate?moment(this.DueDate).format('MM/DD/YYYY'):null;
	});
	
	this.__defineSetter__("dateProp",function(val){
			
			if(val){
				var tempDate = new Date(val);
				
				if(!this.DueDate){
					this.DueDate = new Date();
				}
				
				this.DueDate.setDate(tempDate.getUTCDate());
				this.DueDate.setMonth(tempDate.getUTCMonth());
				this.DueDate.setFullYear(tempDate.getUTCFullYear());
			}
			else{
				this.DueDate = null;
				
			}
	});	
	
	this.__defineGetter__("timeProp",function(){
		return this.DueDate?moment(this.DueDate).format("h:mm A"):null;
	
	});
	
	this.__defineSetter__("timeProp",function(val){
		if(val){
			if(!this.DueDate){
					this.DueDate = new Date();
				}
			this.DueDate  = new Date(this.DueDate.toDateString() + ' ' + val);
		}
		else{
			this.DueDate = null;
		}
	});
	*/
	this.Dehydrate = function(){
		
		return {
			_id:this._id,
			DueDate:(this.dueDatePart||this.dueTimePart)? new Date(this.dueDatePart + ' ' + this.dueTimePart):null,
			Content:this.Content,
			Owner: this.Owner,
			CreatedDate:this.CreatedDate,
			Status:this.Status
			
		};
	};
}

