export default function handler(req, res) {

    // Only POST requests are allowed
    if (req.method !== "POST") {

        return res.status(405).json({
            error: "Method not allowed"
        });
    }


    try {

        const body = req.body || {};

        const latitude = Number(body.latitude);
        const longitude = Number(body.longitude);
        const accuracy = Number(body.accuracy);


        // Validate latitude
        if (
            !Number.isFinite(latitude) ||
            latitude < -90 ||
            latitude > 90
        ) {

            return res.status(400).json({
                error: "Invalid latitude"
            });
        }


        // Validate longitude
        if (
            !Number.isFinite(longitude) ||
            longitude < -180 ||
            longitude > 180
        ) {

            return res.status(400).json({
                error: "Invalid longitude"
            });
        }


        // Validate accuracy
        if (
            !Number.isFinite(accuracy) ||
            accuracy < 0
        ) {

            return res.status(400).json({
                error: "Invalid accuracy"
            });
        }


        const created_at =
            new Date().toISOString();


        // Server log
        console.log({
            latitude: latitude,
            longitude: longitude,
            accuracy: accuracy,
            created_at: created_at
        });


        return res.status(200).json({

            message: "Location received successfully",

            latitude: latitude,

            longitude: longitude,

            accuracy: accuracy,

            created_at: created_at

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
}