import {
   GraphQLList,
   GraphQLObjectType,
   GraphQLScalarType,
   GraphQLString,
} from 'graphql';
import { Launch } from './index';





const QueryType = new GraphQLObjectType({
   name: 'Query',
   description: 'The root of all... queries',
   fields: () => ({
      allPeople: {
         type: new GraphQLList(LaunchGraphType),
         resolve: root => ""// Fetch the index of people from the REST API,
      },
      person: {
         type: LaunchGraphType,
         args: {
            id: { type: GraphQLString },
         },
         resolve: (root, args) => "" // Fetch the person with ID `args.id`,
      },
   }),
});

const LaunchGraphType: GraphQLObjectType<any, any> = new GraphQLObjectType({
   name: 'Launch',
   description: 'Somebody that you used to know',
   fields: () => ({
      links: {
         // name: "links",
         type: new GraphQLObjectType({
            name: "link_field",
            fields: () => ({
               rocket: {
                  // name: "rocket",
                  type: new GraphQLObjectType({
                     name: "rocket_field",
                     fields: () => ({
                        rocket_id: { type: GraphQLString },
                        rocket_name: { type: GraphQLString },
                        rocket_type: { type: GraphQLString },
                        first_stage: {
                           type: new GraphQLObjectType({
                              name: "first_stage_field",
                              fields: () => ({
                                 cores: {type: new GraphQLList(new GraphQLObjectType({
                                    name: "cores_field",
                                    fields: () => ({
                                       core_serial: {type: GraphQLString},
                                       flight: {type: GraphQLScalarType<Number>}
                                    })
                                 }))}
                              })
                           })
                        }
                     })
                  })
               },
               launch_site: {
                  name: "launch_site",
                  type: GraphQLString
               },
               mission_name: {
                  name: "mission_name",
                  type: GraphQLString
               },
               flight_number: {
                  name: "flight_number",
                  type: GraphQLString
               },
               mission_patch: {
                  name: "mission_patch",
                  type: GraphQLString
               },
               mission_patch_small: {
                  name: "mission_patch_small",
                  type: GraphQLString
               },
               flickr_images: {
                  name: "flickr_images",
                  type: new GraphQLList(GraphQLString)
               }
            })
         }),
         //  resolve: person => person.first_name,
      },
      lastName: {
         type: GraphQLString,
         //  resolve: person => person.last_name,
      },
      email: { type: GraphQLString },
      id: { type: GraphQLString },
      username: { type: GraphQLString },
      friends: {
         type: new GraphQLList(LaunchGraphType),
         resolve: person => ""// Fetch the friends with the URLs `person.friends`,
      },
   }),
});