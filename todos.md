would be nice to have a reverse look up
viF -- get the function that is behind the cursor
viI -- get the conditional that is behind the cursor
... so and so on

nodes :
@assignment.lhs
@attribute.inner
@attribute.outer
@call.inner
@call.outer
@class.inner
@class.outer
@comment.inner
@comment.outer
@loop.inner
@loop.outer
@parameter.inner
@parameter.outer

    //maybe
    @block.inner
    @block.outer

multi lang support

bugs:

inner functions either one line or select the name of another
for (const match of matches) {
for (const f of match.captures) {
nodes.push(f.node);
}
}

     should select the loop of f but selects the nodes push
