using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MediXpress_Medicine_Service_Api.Migrations
{
    /// <inheritdoc />
    public partial class migrationdb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tbl_Category",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CatName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_Category", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_Medicines",
                columns: table => new
                {
                    med_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MedName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MedDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MedPower = table.Column<int>(type: "int", nullable: false),
                    MedStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MedCost = table.Column<int>(type: "int", nullable: false),
                    MedImage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PharmacyName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PharmacyId = table.Column<int>(type: "int", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_Medicines", x => x.med_id);
                    table.ForeignKey(
                        name: "FK_tbl_Medicines_tbl_Category_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "tbl_Category",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tbl_Medicines_CategoryId",
                table: "tbl_Medicines",
                column: "CategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbl_Medicines");

            migrationBuilder.DropTable(
                name: "tbl_Category");
        }
    }
}
