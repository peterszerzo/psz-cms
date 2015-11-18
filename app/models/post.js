import Base from './base.js'

var Post = Object.create(Base)

Post.fields = [

	{
	    key: 'id',
	    type: 'text',
	    defaultValue: 'choose-id',
	    formComponent: 'Input'
	},

	{
	    key: 'type',
	    type: 'text',
	    defaultValue: 'project',
	    formComponent: 'Input'
	},

	{
	    key: 'title',
	    type: 'text',
	    defaultValue: 'Project title',
	    formComponent: 'Input'
	},

	{
	    key: 'headline',
	    type: 'text',
	    defaultValue: '',
	    formComponent: 'Input'
	},

	{
	    key: 'name',
	    type: 'text',
	    defaultValue: 'Project name',
	    formComponent: 'Input'
	}, 

	{
	    key: 'supervisors',
	    type: 'json',
	    defaultValue: [],
	    formComponent: 'CommaSeparatedArrayInput'
	},

	{
	    key: 'collaborators',
	    type: 'json',
	    defaultValue: [],
	    formComponent: 'Input'
	},

	{
	    key: 'post_group',
	    type: 'text',
	    defaultValue: 'featured',
	    formComponent: 'Input'
	},

	{
	    key: 'built_with',
	    type: 'json',
	    defaultValue: [],
	    formComponent: 'Input'
	},

	{
	    key: 'body_text',
	    type: 'text',
	    defaultValue: "Stay tuned for this post's body text.",
	    formComponent: 'TextArea'
	},

	{
	    key: 'display_order',
	    type: 'integer',
	    defaultValue: 0,
	    formComponent: 'Input'
	},

	{
	    key: 'dates',
	    type: 'json',
	    defaultValue: [],
	    formComponent: 'Input'
	},

	{
	    key: 'links',
	    type: 'json',
	    defaultValue: [],
	    formComponent: 'Input'
	},

	{
	    key: 'is_live',
	    type: 'boolean',
	    defaultValue: false,
	    formComponent: 'Checkbox',
	    options: [ { value: true, name: 'Yes' }, { value: false, name: 'No' } ]
	}
]

Post.create = function(data) { 

	var self = Object.create(Post)

	self.data = {}

	for (let key in data) {
		self.data[key] = data[key]
	}

	self.tableName = 'posts'

	return self

}

export default Post