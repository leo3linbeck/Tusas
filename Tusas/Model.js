include('Libraries/L3.js');

guidedModel =// @startlock
{
	School :
	{
		events :
		{
			onSave:function()
			{// @endlock
				L3.updateAddressInfo(this, 'main');
			}// @startlock
		}
	},
	District :
	{
		events :
		{
			onSave:function()
			{// @endlock
				L3.updateAddressInfo(this, 'main');
			}// @startlock
		}
	},
	SchoolOption :
	{
		selectedIcon :
		{
			onGet:function()
			{// @endlock
				return (this.selected ? '/images/onebit_44.png' : '/images/onebit_46.png');
			}// @startlock
		}
	},
	SchoolApplication :
	{
		methods :
		{// @endlock
			applicationDoesNotExist:function(childID, schoolID)
			{// @lock
				return (ds.SchoolApplication.find('applicant.ID === :1 AND submittedTo.ID === :2', childID, schoolID) === null);
			}// @startlock
		}
	},
	Person :
	{
		events :
		{
			onSave:function()
			{// @endlock
				L3.updateAddressInfo(this, 'home');
				L3.updateAddressInfo(this, 'work');
			}// @startlock
		},
		ageToday :
		{
			onGet:function()
			{// @endlock
				var bday = this.birthdate;
				if (bday) {
					var today = new Date;
					var age =  today.getFullYear() - bday.getFullYear();
					if (today.getMonth() < bday.getMonth()) {
						age -= 1;
					}
					else {
						if (today.getMonth() === bday.getMonth() && today.getDay() < bday.getDay()) {
							age -= 1;
						}
					}
					return age;
				}
				else {
					return null;
				}
			}// @startlock
		},
		fullName :
		{
			onGet:function()
			{// @endlock
				return this.firstName + (this.middleName ? ' ' + this.middleName : '') + (this.lastName ? ' ' + this.lastName : '') + (this.suffix ? ' ' + this.suffix : '')
			}// @startlock
		}
	},
	Family :
	{
		events :
		{
			onSave:function()
			{// @endlock
				L3.updateAddressInfo(this, 'main');
			}// @startlock
		},
		numberOfChildren :
		{
			onGet:function()
			{// @endlock
				return this.children.length;
			}// @startlock
		}
	}
};// @endlock
