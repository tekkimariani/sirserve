import dotenv from "dotenv";
import express from "express";
import path from "path";
import { Main } from './lib/sir/Main';
import { Vector2D } from "./lib/awt/Vector2D"
import { Settings } from './lib/sir/Settings';

class Server {
    constructor() {
        // initialize configuration
        dotenv.config();

        // port is now available to the Node.js runtime
        // as if it were an environment variable
        const port = process.env.SERVER_PORT;

        const app = express();
        // app.use(require('body-parser').urlencoded({ extended: true }));
        // app.use(express.urlencoded());
        app.use(express.json());

        // Configure Express to use EJS
        app.set( "views", path.join( __dirname, "views" ) );
        app.set( "view engine", "ejs" );


        // define a route handler for the default home page
        app.get( "/", ( req, res ) => {
            // render the index template
            // res.render( "index" );
            res.render( "sir" );
        } );


        // define a route handler for the default home page
        app.get( "/sir", ( req, res ) => {
            // render the index template
            res.render( "sir" );
        } );

        // define a route handler for the default home page
        app.post( "/sir_data", ( req, res ) => {
            /*
            static amount: number = 1000;     // Anzahl Personen.
            static infected: number = 2;   // Anzahl anfangs infizierter Personen.
            static maxSimulations = 1; // Anzahl an Simulationen die nacheinander durchlaufen werden.
            static maxDaysPerSimulation: number = 100;    // Anzahl an Tagen die Simuliert wird.
            static stepsPerDay: number = 15;             // Anzahl an Schritte die eine Person an einem Tag macht.
            static infectionRate: number = 0.67 // Wahrscheinlichkeit zur Ansteckung?
            static criticalDistance: number = 5;
            static infectionDuration: number = 5;
            */
                        // tslint:disable-next-line:no-console
                        // console.log(req);
            Settings.setAmount(parseFloat(req.body.amount));
            Settings.setInfected(parseFloat(req.body.infected));
            Settings.setMaxSimulations(parseFloat(req.body.maxSimulations));
            Settings.setMaxDaysPerSimulation(parseFloat(req.body.maxDaysPerSimulation));
            Settings.setStepsPerDay(parseFloat(req.body.stepsPerDay));
            Settings.setInfectionRate(parseFloat(req.body.infectionRate));
            Settings.setCriticalDistance(parseFloat(req.body.criticalDistance));
            Settings.setInfectionDuration(parseFloat(req.body.infectionDuration));

            // req.body.test
            const main = new Main();
            // tslint:disable-next-line:no-console
            console.log(main);
            res.send(main);
        } );

        // start the express server
        app.listen( port, () => {
            // tslint:disable-next-line:no-console
            console.log( `server started at http://localhost:${ port }` );
        } );
    }
}
const server = new Server();
