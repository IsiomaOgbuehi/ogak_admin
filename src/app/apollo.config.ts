import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
// 1
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { GC_AUTH_TOKEN } from './constants';
import { ApolloLink } from 'apollo-link';


const middleware = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem(GC_AUTH_TOKEN);
    if (token) {
        operation.setContext({
            headers: new HttpHeaders().set('Authorization', `JWT ${token}`)
        });
    }
    return forward(operation);
});

@NgModule({
    exports: [
        // 2
        HttpClientModule,
        ApolloModule,
        HttpLinkModule
    ]
})


export class GraphQLModule {
    // 3
    constructor(apollo: Apollo, httpLink: HttpLink) {

        // 4
        const uri = 'https://api.ogak.com.ng/api/';  //  http://134.122.15.1:9000/   http://127.0.0.1:8000/  https://api.ogak.com.ng/api/
        const http = httpLink.create({ uri });

        // 5
        // apollo.create({
        //     link: http,
        //     cache: new InMemoryCache()
        // });
        apollo.create({
            link: middleware.concat(http),
            cache: new InMemoryCache()
        });
    }
}
