import {
    Component,
    Prop,
    Vue
} from 'vue-property-decorator';

import './home.scss';

import axios from 'axios';

@Component
export default class HelloWorld extends Vue {

    @Prop() private hellowMessage!: string;

    constructor() {
        super()
    }

    mounted() {
        axios.post('http://localhost:23646/auth/signUp', {
            name: 'jo',
            pass_word: 'myPassWord',
        }).then(res => {
            console.log(res)
        })
        console.log(this.hellowMessage);
    }
}
