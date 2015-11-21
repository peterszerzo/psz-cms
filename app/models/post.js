import Base from './base.js'

// Inherit from base.
var Post = Object.create(Base)

Post.fields = [

	{
	    key: 'id',
	    type: 'text',
	    defaultValue: 'choose-id',
	    formComponentName: 'Text',
	    labelText: 'Post ID',
	    hint: 'Same as url fragment'
	},

	{
	    key: 'type',
	    type: 'text',
	    defaultValue: 'project',
	    formComponentName: 'Text',
	    labelText: 'Post ID',
	    hint: 'Same as url fragment'
	},

	{
	    key: 'title',
	    type: 'text',
	    defaultValue: 'Project title',
	    formComponentName: 'Text',
	    labelText: 'Post ID',
	    hint: 'Same as url fragment'
	},

	{
	    key: 'headline',
	    type: 'text',
	    defaultValue: '',
	    formComponentName: 'Text',
	    labelText: 'Post ID',
	    hint: 'Same as url fragment'
	},

	{
	    key: 'name',
	    type: 'text',
	    defaultValue: 'Project name',
	    formComponentName: 'Text',
	    labelText: 'Post ID',
	    hint: 'Same as url fragment'
	}, 

	{
	    key: 'supervisors',
	    type: 'json',
	    defaultValue: [],
	    formComponentName: 'Text',
	    labelText: 'Post ID',
	    hint: 'Same as url fragment'
	},

	{
	    key: 'collaborators',
	    type: 'json',
	    defaultValue: [],
	    formComponentName: 'Text',
	    labelText: 'Post ID (same as url fragment)',
	    hint: 'Same as url fragment'
	},

	{
	    key: 'post_group',
	    type: 'text',
	    defaultValue: 'featured',
	    formComponentName: 'Text',
	    labelText: 'Post ID (same as url fragment)',
	    hint: 'Same as url fragment'
	},

	{
	    key: 'built_with',
	    type: 'json',
	    defaultValue: [],
	    formComponentName: 'Text',
	    labelText: 'Post ID (same as url fragment)',
	    hint: 'Same as url fragment'
	},

	{
	    key: 'body_text',
	    type: 'text',
	    defaultValue: "Stay tuned for this post's body text.",
	    formComponentName: 'Text',
	    labelText: 'Body Text',
	    hint: 'Same as url fragment'
	},

	{
	    key: 'display_order',
	    type: 'integer',
	    defaultValue: 0,
	    formComponentName: 'Text',
	    labelText: 'Post ID',
	    hint: 'Same as url fragment'
	},

	{
	    key: 'dates',
	    type: 'json',
	    defaultValue: [],
	    formComponentName: 'Text',
	    labelText: 'Post ID',
	    hint: 'Same as url fragment'
	},

	{
	    key: 'links',
	    type: 'json',
	    defaultValue: [],
	    formComponentName: 'Text',
	    labelText: 'Post ID',
	    hint: 'Same as url fragment'
	},

	{
	    key: 'is_live',
	    type: 'boolean',
	    defaultValue: false,
	    formComponent: 'Text',
	    options: [ { value: true, name: 'Yes' }, { value: false, name: 'No' } ],
	    labelText: 'Post ID',
	    hint: 'Same as url fragment'
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