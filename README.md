Example Multi-Host Compose App
==============================


This is meant to serve as an example of a simple Compose app that uses volumes and networking, and can be deployed to multiple hosts and scaled up arbitrarily.


Starting
--------

Since this app makes use of Compose's experimental networking support, it must be started with:

    $ docker-compose --x-networking up -d

Furthermore, when deploying to a Swarm, you must have a backing store configured for network drivers, and specify the "overlay" driver when starting the app:

    $ docker-compose --x-networking --x-network-driver=overlay up -d

Remember to prefix *every* `docker-compose` command with these flags.

See this guide for how to set up a Swarm with the overlay driver:

http://docs.docker.com/engine/userguide/networking/get-started-overlay/


Demonstrating
-------------

With the app running, open up the `web` container's interface at `http://{your docker host's IP}:5000`. You should see a live-updating graph of the number of "jobs" being done per second.

Scale up the number of workers:

    $ docker-compose --x-networking scale worker=10
    Creating and starting 2 ... done
    Creating and starting 3 ... done
    Creating and starting 4 ... done
    Creating and starting 5 ... done
    Creating and starting 6 ... done
    Creating and starting 7 ... done
    Creating and starting 8 ... done
    Creating and starting 9 ... done
    Creating and starting 10 ... done

If you go back to the browser, you should see the throughput jump up by a factor of 10.
