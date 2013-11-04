
guidedModel =// @startlock
{
	Family :
	{
		numberOfChildren :
		{
			onGet:function()
			{// @endlock
				return this.children.length;
			}// @startlock
		}
	}
};// @endlock
