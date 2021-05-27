using Microsoft.EntityFrameworkCore.Migrations;

namespace DataLayer.Migrations
{
    public partial class fulldatabasesnapshot3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__Transacti__Recei__6754599E",
                table: "Transaction");

            migrationBuilder.DropForeignKey(
                name: "FK__Transacti__Sende__66603565",
                table: "Transaction");

            migrationBuilder.DropForeignKey(
                name: "FK__User__AccountId__6383C8BA",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_User_AccountId",
                table: "User");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Account",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Account_UserId",
                table: "Account",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK__Account__UserId__75A278F5",
                table: "Account",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK__Transacti__Recei__797309D9",
                table: "Transaction",
                column: "ReceiverId",
                principalTable: "Account",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK__Transacti__Sende__787EE5A0",
                table: "Transaction",
                column: "SenderId",
                principalTable: "Account",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__Account__UserId__75A278F5",
                table: "Account");

            migrationBuilder.DropForeignKey(
                name: "FK__Transacti__Recei__797309D9",
                table: "Transaction");

            migrationBuilder.DropForeignKey(
                name: "FK__Transacti__Sende__787EE5A0",
                table: "Transaction");

            migrationBuilder.DropIndex(
                name: "IX_Account_UserId",
                table: "Account");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Account");

            migrationBuilder.CreateIndex(
                name: "IX_User_AccountId",
                table: "User",
                column: "AccountId");

            migrationBuilder.AddForeignKey(
                name: "FK__Transacti__Recei__6754599E",
                table: "Transaction",
                column: "ReceiverId",
                principalTable: "Account",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK__Transacti__Sende__66603565",
                table: "Transaction",
                column: "SenderId",
                principalTable: "Account",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK__User__AccountId__6383C8BA",
                table: "User",
                column: "AccountId",
                principalTable: "Account",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
