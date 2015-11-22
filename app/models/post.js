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
	    labelText: 'Post type',
	    hint: 'project | blog_post'
	},

	{
	    key: 'title',
	    type: 'text',
	    defaultValue: 'Project title',
	    formComponentName: 'Text',
	    labelText: 'Post title',
	    hint: 'Enter project title'
	},

	{
	    key: 'headline',
	    type: 'text',
	    defaultValue: '',
	    formComponentName: 'Text',
	    labelText: 'Post headline',
	    hint: 'Or subtitle...'
	},

	{
	    key: 'name',
	    type: 'text',
	    defaultValue: 'Project name',
	    formComponentName: 'Text',
	    labelText: 'Post name',
	    hint: 'Appears at links to the post from the listing page.'
	}, 

	{
	    key: 'supervisors',
	    type: 'json',
	    defaultValue: '[]',
	    formComponentName: 'Text',
	    labelText: 'Supervisors',
	    hint: 'Enter array'
	},

	{
	    key: 'collaborators',
	    type: 'json',
	    defaultValue: '[]',
	    formComponentName: 'Text',
	    labelText: 'Collaborators',
	    hint: 'Enter array'
	},

	{
	    key: 'post_group',
	    type: 'text',
	    defaultValue: 'featured',
	    formComponentName: 'Text',
	    labelText: 'Post group',
	    hint: 'featured | etc.'
	},

	{
	    key: 'built_with',
	    type: 'json',
	    defaultValue: '[]',
	    formComponentName: 'Text',
	    labelText: 'Built with',
	    hint: 'Enter list of technologies'
	},

	{
	    key: 'body_text',
	    type: 'text',
	    defaultValue: "Stay tuned for this post's body text.",
	    formComponentName: 'Text',
	    labelText: 'Body Text',
	    hint: 'Enter html.'
	},

	{
	    key: 'display_order',
	    type: 'integer',
	    defaultValue: '0',
	    formComponentName: 'Text',
	    labelText: 'Display order',
	    hint: 'Add order in which post should appear.'
	},

	{
	    key: 'dates',
	    type: 'json',
	    defaultValue: [],
	    formComponentName: 'Text',
	    labelText: 'Dates',
	    hint: 'Enter as array: [ "2013-11", "2014-9" ]'
	},

	{
	    key: 'links',
	    type: 'json',
	    defaultValue: [],
	    formComponentName: 'Text',
	    labelText: 'Links',
	    hint: 'Enter as array of objects: [ { name: "", url: "" }, { name: "", url: "" } ]'
	},

	{
	    key: 'is_live',
	    type: 'boolean',
	    defaultValue: false,
	    formComponent: 'Text',
	    options: [ { value: true, name: 'Yes' }, { value: false, name: 'No' } ],
	    labelText: 'Is live',
	    hint: 'Set as true or false depending on whether post is live.'
	}
]

Post.tableName = 'posts'

export default Post